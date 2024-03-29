import { IWebsiteService } from "./domains/websites/WebsiteService";
import { convertArrayToCSV } from "convert-array-to-csv";
import fs, { PathLike } from "fs";
import { DomainError, PathError } from "./domains/errors/Errors";
import { ResponseStatus } from "./domains/errors/ErrorTypes";
import { ILogService } from "./domains/logs/LogService";

export interface ICSVService {
  saveWebsiteLogsToCSV(path: PathLike): Promise<void>;
  saveWebsitesLogsInGivenTimePeriodToCSV(
    id: string,
    startDate: Date,
    endDate: Date,
    path: PathLike
  ): Promise<void>;
  readFile(path: PathLike): Promise<void>;
}

export class CSVService implements ICSVService {
  constructor(
    private readonly websiteService: IWebsiteService,
    private readonly logService: ILogService
  ) {}

  async saveWebsitesLogsInGivenTimePeriodToCSV(
    id: string,
    startDate: Date,
    endDate: Date,
    path: PathLike
  ) {
    const convertedFile = await this.convertLogsInGivenTimePeriodToCSV(
      id,
      new Date(startDate),
      new Date(endDate)
    );
    try {
      await fs.promises.writeFile(path, convertedFile);
    } catch (error) {
      throw new PathError("Cannot write file");
    }
  }

  async saveWebsiteLogsToCSV(path: PathLike) {
    const websites = await this.websiteService.getAllWebsites();
    websites.forEach((element) => {
      this.logService.addLogForWebsite(element.id);
    });
    const file = convertArrayToCSV(websites);
    try {
      await fs.promises.writeFile(path, file);
    } catch (error) {
      throw new PathError("Cannot write file");
    }
  }

  async readFile(path: PathLike) {
    try {
      const file = await fs.promises.readFile(path);
      console.log(file);
    } catch (error) {
      throw new PathError(`Cannot read file from ${path}`);
    }
  }

  private async convertLogsInGivenTimePeriodToCSV(
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
    console.log(filteredWebsites);
    return convertArrayToCSV(filteredWebsites);
  }

  private checkDate(startDate: Date, endDate: Date) {
    if (endDate < startDate)
      throw new DomainError(
        "Please provide dates in different order",
        ResponseStatus.BAD_REQUEST
      );
  }
}
