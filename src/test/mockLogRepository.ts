import { randomUUID } from "crypto";
import { ILogRepository } from "../domains/logs/LogRepository";
import { Log } from "../domains/logs/LogTypes";
import { WebsiteStatus } from "../domains/websites/WebsiteTypes";

export class MockLogRepository implements ILogRepository {
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
    this.fakeDB.find((element) => {
      if (!element.deleted_at && element.id === id) {
        element.deleted_at = new Date();
      }
    });
  }

  async getLog(id: string) {
    return this.fakeDB.find((element) => {
      if (element.id === id && !element.deleted_at) return element;
    });
  }

  async getAllLogs() {
    return this.fakeDB.filter((element) => !element.deleted_at);
  }
}
