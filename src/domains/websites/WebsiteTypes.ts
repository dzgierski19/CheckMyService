import { Log } from "../logs/LogTypes";

export enum WebsiteStatus {
  DOWN = "DOWN",
  RUNNING = "RUNNING",
}

export type WebsiteConstructor = {
  id: string;
  name: string;
  createdAt: Date;
  deletedAt: Date | null;
  logs: Log[];
};

export class Website {
  id: string;
  name: string;
  createdAt: Date;
  deletedAt: Date | null;
  logs: Log[];
  private constructor(website: WebsiteConstructor) {
    this.id = website.id;
    this.name = website.name;
    this.logs = website.logs;
    this.createdAt = website.createdAt ?? new Date();
    this.deletedAt = null;
  }

  static create(website: WebsiteConstructor): Website {
    return new Website(website);
  }
}
