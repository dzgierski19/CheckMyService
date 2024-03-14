import axios, { AxiosResponse } from "axios";
import { WebsiteStatus } from "../websites/WebsiteTypes";
import { ILogRepository } from "./LogRepository";
import { IWebsiteService } from "../websites/WebsiteService";
import { DomainError, ItemNotAvailableError } from "../errors/Errors";
import { ResponseStatus } from "../errors/ErrorTypes";
import { Log } from "./LogTypes";

export interface ILogService {
  addLogForWebsite(id: string): Promise<void>;
  deleteLog(id: string): Promise<void>;
  getLog(id: string): Promise<Log>;
  getAllLogs(url: string): Promise<Log[]>;
}

export class LogService implements ILogService {
  constructor(
    private readonly logRepository: ILogRepository,
    private readonly websiteService: IWebsiteService
  ) {}

  async addLogForWebsite(id: string) {
    const url = await this.websiteService.getWebsiteUrl(id);
    const urlWithProtocol = "https://" + url;
    const { httpCode, status } = await this.getInfoAboutUrl(urlWithProtocol);
    await this.logRepository.addLog(httpCode, status, id);
  }

  async deleteLog(id: string) {
    const log = await this.logRepository.getLog(id);
    if (log) {
      if (log.deleted_at) {
        throw new ItemNotAvailableError("Log is already deleted");
      }
    }
    await this.logRepository.deleteLog(id);
  }

  async getLog(id: string) {
    const log = await this.logRepository.getLog(id);
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
    throw new ItemNotAvailableError(`${id} is not available`);
  }

  async getAllLogs(websiteId: string) {
    const getLogs = await this.logRepository.getAllLogs(websiteId);
    return getLogs.map((log) =>
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

  private async getInfoAboutUrl(url: string) {
    const response = await this.websiteService.getResponseFromUrl(url);
    const { config, status } = response;
    const httpStatus = this.isSiteRunning(status);
    const URLwithInfo = {
      name: config.url,
      httpCode: status,
      status: httpStatus,
    };
    console.log(URLwithInfo);
    return URLwithInfo;
  }

  private isSiteRunning(status: number): WebsiteStatus {
    return status.toString()[0] === "2"
      ? WebsiteStatus.RUNNING
      : WebsiteStatus.DOWN;
  }
}
