import { CronJob } from "cron";
import { IWebsiteRepository } from "./domains/websites/WebsiteRepository";
import { ILogService, LogService } from "./domains/logs/LogService";
import { IWebsiteService } from "./domains/websites/WebsiteService";
import { CRON_EVERY_10_SECONDS, logService, websiteService } from "./IoC";
import fs, { PathLike } from "fs";
import { ICSVService } from "./CSVService";

export interface ICron {
  checkWebsites(path: PathLike): Promise<void>;
}

export class Cron implements ICron {
  constructor(
    // private readonly logService: ILogService,
    // private readonly websiteService: IWebsiteService,
    private readonly CSVService: ICSVService
  ) {}

  async checkWebsites(path: PathLike) {
    new CronJob(CRON_EVERY_10_SECONDS, async () => {
      // const websites = await this.websiteService.getAllWebsites();
      // websites.forEach((element) => {
      //   this.logService.addLogForWebsite(element.id);
      // });
      await this.CSVService.saveWebsiteLogsToCSV(path);
    }).start();
  }
}
