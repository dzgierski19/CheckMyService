import { NextFunction, Request, Response } from "express";
import {
  deleteWebsiteRequest,
  getReportRequest,
  websitePaginationRequest,
  postWebsiteRequest,
} from "../../schemas/ValidateSchema";
import { IWebsiteService } from "./WebsiteService";
import { ParsedRequest } from "../../interfaces/api/apiTypes";
import { ResponseStatus } from "../errors/ErrorTypes";
import { PATH_TO_RAPORT_CSV, csvService } from "../../IoC";
import { paginate } from "../../middlewares/paginationMiddleware";
import { Website } from "./WebsiteTypes";

interface IWebsiteController {
  postWebsite(
    req: ParsedRequest<postWebsiteRequest>,
    res: Response
  ): Promise<void>;
  deleteWebsite(
    req: ParsedRequest<deleteWebsiteRequest>,
    res: Response
  ): Promise<void>;
  getWebsites(
    req: ParsedRequest<websitePaginationRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  getWebsiteReport(
    req: ParsedRequest<getReportRequest>,
    res: Response
  ): Promise<void>;
}

export class WebsiteController implements IWebsiteController {
  constructor(private readonly websiteService: IWebsiteService) {}

  postWebsite = async (
    req: ParsedRequest<postWebsiteRequest>,
    res: Response
  ) => {
    const { url } = req.body;
    await this.websiteService.addWebsite(url);
    const websites = await this.websiteService.getAllWebsites();
    res.status(ResponseStatus.CREATED).send(websites);
  };

  deleteWebsite = async (
    req: ParsedRequest<deleteWebsiteRequest>,
    res: Response
  ) => {
    const { id } = req.body;
    console.log(req.params);
    await this.websiteService.deleteWebsite(id);
    res.status(ResponseStatus.NO_CONTENT).send(`${id} was deleted`);
  };

  getWebsites = async (
    req: ParsedRequest<websitePaginationRequest>,
    res: Response
  ) => {
    const websites = await this.websiteService.getAllWebsites();
    paginate<Website>(websites)(req, res, () => {
      const result = req.body;
      res.status(ResponseStatus.SUCCESS).send(result);
    });
  };

  getWebsiteReport = async (
    req: ParsedRequest<getReportRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { start, finish } = req.query;
    console.log(req.query);
    const id = req.params.websiteId;
    // const startDate = new Date(start);
    // const finishDate = new Date(finish);
    // if (typeof start === "string" && typeof finish === "string") {
    await csvService.streamLogs(id, start, finish, res, next);
    res.status(ResponseStatus.SUCCESS);
    // .download(PATH_TO_RAPORT_CSV, `Logs raport for ID: ${id}.csv`);
  };
  // };
}
