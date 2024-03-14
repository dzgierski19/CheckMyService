import { NextFunction, Request, Response } from "express";
import {
  deleteWebsiteRequest,
  deleteWebsiteSchema,
  postWebsiteRequest,
  postWebsiteSchema,
} from "../../schemas/ValidateSchema";
import { IWebsiteService } from "./WebsiteService";
import { ParsedRequest } from "../../interfaces/api/apiTypes";
import { ResponseStatus } from "../errors/ErrorTypes";

interface IWebsiteController {
  postWebsite(
    req: ParsedRequest<postWebsiteRequest>,
    res: Response
  ): Promise<void>;
  deleteWebsite(
    req: ParsedRequest<deleteWebsiteRequest>,
    res: Response
  ): Promise<void>;
  getWebsites(req: Request, res: Response): Promise<void>;
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
    await this.websiteService.deleteWebsite(id);
    res.status(ResponseStatus.NO_CONTENT).send(`${id} was deleted`);
  };

  getWebsites = async (req: Request, res: Response) => {
    const websites = await this.websiteService.getAllWebsites();
    res.status(ResponseStatus.SUCCESS).send(websites);
    console.log(websites);
  };
}
