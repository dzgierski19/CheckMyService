import { CronJob } from "cron";
import { IWebsiteRepository } from "../domains/websites/WebsiteRepository";
import { ILogService, LogService } from "../domains/logs/LogService";
import { IWebsiteService } from "../domains/websites/WebsiteService";
import { CRON_EVERY_10_SECONDS, logService, websiteService } from "../IoC";
import { ICSVService } from "../domains/csv/CSVService";

export interface ICron {
  checkWebsites(): Promise<void>;
}

export class Cron implements ICron {
  constructor(
    private readonly logService: ILogService,
    private readonly websiteService: IWebsiteService // private readonly CSVService: ICSVService
  ) {}

  async checkWebsites() {
    new CronJob(CRON_EVERY_10_SECONDS, async () => {
      const websites = await this.websiteService.getAllWebsites();
      websites.forEach((element) => {
        this.logService.addLogForWebsite(element.id);
      });
      // await this.CSVService.saveWebsiteLogsToCSV(path);
    }).start();
  }
}
