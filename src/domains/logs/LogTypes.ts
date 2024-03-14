import { Status } from "@prisma/client";

type LogConstructor = {
  id: string;
  created_at: Date;
  http_code: number;
  status: Status;
  deleted_at: Date | null;
  websiteId: string;
};

export class Log {
  id: string;
  websiteId: string;
  http_code: number;
  status: Status;
  created_at: Date;
  deleted_at: Date | null;

  private constructor(log: LogConstructor) {
    this.id = log.id;
    this.websiteId = log.websiteId;
    this.http_code = log.http_code;
    this.status = log.status;
    this.created_at = log.created_at;
    this.deleted_at = null;
  }

  static create(log: LogConstructor): Log {
    return new Log(log);
  }
}
