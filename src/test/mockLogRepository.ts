import { randomUUID } from "crypto";
import { prisma } from "../IoC";
import { ILogRepository } from "../domains/logs/LogRepository";
import { Log } from "../domains/logs/LogTypes";
import { WebsiteStatus } from "../domains/websites/WebsiteTypes";
import { LogService } from "../domains/logs/LogService";
import { MockWebsiteRepository, webserv } from "./mockWebsiteRepository";

export class mockLogRepository implements ILogRepository {
  fakeDB: Log[] = [];

  async addLog(
    http_code: number,
    status: WebsiteStatus,
    id: string
  ): Promise<void> {
    const log = {
      id: randomUUID(),
      websiteId: id,
      http_code: http_code,
      status: status,
      created_at: new Date(),
      deleted_at: null,
    };
    this.fakeDB.push(log);
  }

  async deleteLog(id: string) {
    this.fakeDB.map((log) => {
      if (log.id === id && !log.deleted_at) {
        log.deleted_at = new Date();
      }
    });
  }

  async getLog(id: string) {
    return this.fakeDB.find(
      (element) => element.id === id && !element.deleted_at
    );
  }

  async getAllLogs() {
    return this.fakeDB.filter((element) => !element.deleted_at);
  }
}

// const mockLog = new mockLogRepository();
// const mockLogServ = new LogService(mockLog, webserv);

// async function main() {
//   await webserv.addWebsite("https://www.litecoin.org");
//   const websiteId = await webserv.getWebsiteId("litecoin.org/");
//   await mockLogServ.addLogForWebsite(websiteId);
//   const logs = await mockLogServ.getAllLogs(websiteId);
//   await mockLogServ.deleteLog(logs[0].id);
//   const log = await mockLogServ.getLog(logs[0].id);
//   const logs2 = await mockLogServ.getAllLogs(websiteId);
//   console.log(logs2);
// }

// main();
