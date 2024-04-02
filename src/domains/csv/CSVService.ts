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
    res: Response,
    next: NextFunction
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
    res: Response,
    next: NextFunction
  ) {
    const logs = await this.showLogsForWebsiteInGivenTimePeriod(
      websiteId,
      startDate,
      endDate
    );
    try {
      await this.streamData(res, logs, next);
    } catch (error) {
      throw new PathError("Cannot write file");
    }
  }

  private async streamData<T>(res: Response, data: T[], next: NextFunction) {
    const csvStream = format({ headers: true });
    // res.setHeader("Content-Type", "text/csv");
    // res.setHeader("Content-Disposition", 'attachment; filename="download.csv"');
    csvStream.pipe(res);
    data.forEach((row) => csvStream.write(row));
    csvStream.end();
    next();
  }

  private async showLogsForWebsiteInGivenTimePeriod(
    id: string,
    startDate: Date,
    endDate: Date
  ) {
    this.checkDate(startDate, endDate);
    const website = await this.websiteService.getWebsite(id);
    const filteredWebsites = website.logs.filter((log) => {
      if (startDate < log.created_at && log.created_at < endDate) {
        return log;
      }
    });
    return filteredWebsites;
  }

  private checkDate(startDate: Date, endDate: Date) {
    if (endDate < startDate)
      throw new DomainError(
        "Please provide dates in different order",
        ResponseStatus.BAD_REQUEST
      );
  }
}
