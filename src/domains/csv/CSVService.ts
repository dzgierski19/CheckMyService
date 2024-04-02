import { IWebsiteService } from "../websites/WebsiteService";
import { convertArrayToCSV } from "convert-array-to-csv";
import fs, { PathLike } from "fs";
import { DomainError, PathError } from "../errors/Errors";
import { ResponseStatus } from "../errors/ErrorTypes";
import { ILogService } from "../logs/LogService";
import { format } from "fast-csv";
import { NextFunction, Response } from "express";

export interface ICSVService {
  streamLogs(
    websiteId: string,
    startDate: Date,
    endDate: Date,
    res: Response
  ): Promise<void>;
}

export class CSVService implements ICSVService {
  constructor(
    private readonly websiteService: IWebsiteService,
    private readonly logService: ILogService
  ) {}

  async streamLogs(
    websiteId: string,
    startDate: Date,
    endDate: Date,
    res: Response
  ) {
    const logs = await this.showLogsForWebsiteInGivenTimePeriod(
      websiteId,
      startDate,
      endDate
    );
    try {
      await this.streamData(res, logs);
    } catch (error) {
      throw new PathError("Cannot write file");
    }
  }

  private async streamData<T>(res: Response, data: T[]) {
    const csvStream = format({ headers: true });
    res.setHeader("Content-Type", "text/csv");
    csvStream.pipe(res);
    data.forEach((row) => csvStream.write(row));
    csvStream.end();
    console.log(data);
  }

  private async showLogsForWebsiteInGivenTimePeriod(
    id: string,
    startDate: Date,
    endDate: Date
  ) {
    this.checkDate(startDate, endDate);
    const website = await this.websiteService.getWebsite(id);
    const logs = website.logs.filter((log) => {
      if (startDate < log.created_at && log.created_at < endDate) {
        return log;
      }
    });
    console.log(logs);
    return logs;
  }

  private checkDate(startDate: Date, endDate: Date) {
    if (endDate < startDate)
      throw new DomainError(
        "Please provide dates in different order",
        ResponseStatus.BAD_REQUEST
      );
  }
}
