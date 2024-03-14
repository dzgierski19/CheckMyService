import { prisma } from "../../IoC";
import { Status } from "@prisma/client";
import { Log } from "./LogTypes";
import { WebsiteStatus } from "../websites/WebsiteTypes";
import { DomainError } from "../errors/Errors";
import { ResponseStatus } from "../errors/ErrorTypes";

export interface ILogRepository {
  addLog(httpCode: number, status: WebsiteStatus, id: string): Promise<void>;
  deleteLog(id: string): Promise<void>;
  getLog(id: string): Promise<Log | undefined>;
  getAllLogs(websiteId: string): Promise<Log[]>;
}

export class LogRepository implements ILogRepository {
  constructor() {}

  async addLog(httpCode: number, status: Status, id: string) {
    await prisma.log.create({
      data: {
        http_code: httpCode,
        status: status,
        websiteId: id,
      },
    });
  }

  async deleteLog(id: string) {
    await prisma.log.update({
      where: { id: id },
      data: { deleted_at: new Date() },
    });
  }

  async getLog(id: string) {
    const log = await prisma.log.findFirst({
      where: { id: id, deleted_at: null },
    });
    if (log) {
      return Log.create({
        id: log.id,
        websiteId: log.websiteId,
        http_code: log.http_code,
        status: log.status,
        created_at: log.created_at,
        deleted_at: log.deleted_at,
      });
    }
  }

  async getAllLogs(websiteId: string) {
    const logs = await prisma.log.findMany({
      where: { websiteId: websiteId, deleted_at: null },
    });
    return logs.map((log) =>
      Log.create({
        id: log.id,
        websiteId: log.websiteId,
        http_code: log.http_code,
        status: log.status,
        created_at: log.created_at,
        deleted_at: log.deleted_at,
      })
    );
  }
}
