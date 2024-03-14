import { NextFunction, Request, Response } from "express";
import { ILogService } from "./LogService";
import {
  deleteLogRequest,
  deleteLogSchema,
  postLogRequest,
  postLogSchema,
} from "../../schemas/ValidateSchema";
import { ICron } from "../../Cron";
import { ZodError } from "zod";
import { IWebsiteService } from "../websites/WebsiteService";
import { ResponseStatus } from "../errors/ErrorTypes";
import { ParsedRequest } from "../../interfaces/api/apiTypes";

interface ILogController {
  getLogs(req: Request, res: Response, next: NextFunction): Promise<void>;
  getLog(req: Request, res: Response, next: NextFunction): Promise<void>;
  postLog(
    req: ParsedRequest<postLogRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  deleteLog(
    req: ParsedRequest<deleteLogRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export class LogController implements ILogController {
  constructor(
    private readonly logService: ILogService,
    private readonly websiteService: IWebsiteService
  ) {}

  getLogs = async (req: Request, res: Response) => {
    const id = req.params.websiteId;
    const logs = await this.logService.getAllLogs(id);
    res.status(ResponseStatus.SUCCESS).send(logs);
  };

  getLog = async (req: Request, res: Response) => {
    const logId = req.params.logId;
    const websiteId = req.params.websiteId;
    await this.websiteService.getWebsite(websiteId);
    const log = await this.logService.getLog(logId);
    res.status(ResponseStatus.SUCCESS).send(log);
  };

  postLog = async (req: ParsedRequest<postLogRequest>, res: Response) => {
    const { id } = req.body;
    await this.logService.addLogForWebsite(id);
    res.sendStatus(ResponseStatus.CREATED);
  };

  deleteLog = async (req: ParsedRequest<deleteLogRequest>, res: Response) => {
    const { id } = req.body;
    await this.logService.deleteLog(id);
    res.sendStatus(ResponseStatus.NO_CONTENT);
  };
}
