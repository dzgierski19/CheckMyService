import { NextFunction, Request, Response } from "express";
import { IWebsitesDBHandler } from "../domains/database/WebsitesDBHandler";
import { ZodError } from "zod";
import {
  deleteWebsiteSchema,
  postWebsiteSchema,
} from "../schemas/ValidateSchema";

export class WebsitesController {
  constructor(public readonly websitesDB: IWebsitesDBHandler) {}
  postWebsite = async (req: Request, res: Response) => {
    try {
      const { data } = postWebsiteSchema.parse(req.body);
      await this.websitesDB.addData(data);
      const allData = await this.websitesDB.showAllData();
      console.log(allData);
      res.send(allData);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error);
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      console.error("Database post error:", error);
    }
  };
  deleteWebsite = async (req: Request, res: Response) => {
    try {
      const { id } = deleteWebsiteSchema.parse(req.body);
      await this.websitesDB.deleteData(id);
      const allData = await this.websitesDB.showAllData();
      console.log(allData);
      res.send(allData);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error);
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      console.error("Database post error:", error);
    }
  };

  getWebsites = async (req: Request, res: Response, next: NextFunction) => {
    const websites = await this.websitesDB.showAllData();
    res.send(websites);
    console.log(websites);
  };
  getSomething = async (req: Request, res: Response, next: NextFunction) => {
    res.send("something");
  };
}
