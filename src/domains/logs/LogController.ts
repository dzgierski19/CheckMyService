import { NextFunction, Request, Response } from "express";
import { ILogService } from "./LogService";
import {
  deleteLogRequest,
  getLogRequest,
  logPaginationRequest,
  postLogRequest,
} from "../../schemas/ValidateSchema";
import { IWebsiteService } from "../websites/WebsiteService";
import { ResponseStatus } from "../errors/ErrorTypes";
import { ParsedRequest } from "../../interfaces/api/apiTypes";
import { paginate } from "../../middlewares/paginationMiddleware";

interface ILogController {
  getLogs(
    req: ParsedRequest<logPaginationRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getLog(
    req: ParsedRequest<getLogRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void>;
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

  getLogs = async (req: ParsedRequest<logPaginationRequest>, res: Response) => {
    const id = req.params.websiteId;
    const logs = await this.logService.getAllLogs(id);
    paginate(logs)(req, res, () => {
      const paginatedWebsites = req.body;
      res.status(ResponseStatus.SUCCESS).send(paginatedWebsites);
    });

    // res.status(ResponseStatus.SUCCESS).send(logs);
  };

  getLog = async (req: ParsedRequest<getLogRequest>, res: Response) => {
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
