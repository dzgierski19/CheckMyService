import { NextFunction, Request, Response } from "express";
import { IWebsiteRepository } from "../domains/websites/WebsiteRepository";
import { ZodError } from "zod";
import {
  deleteWebsiteSchema,
  postWebsiteSchema,
} from "../schemas/ValidateSchema";

interface IWebsiteController {
  postWebsite(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteWebsite(req: Request, res: Response, next: NextFunction): Promise<void>;
  getWebsites(req: Request, res: Response, next: NextFunction): Promise<void>;
  getSomething(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class WebsiteController implements IWebsiteController {
  constructor(public readonly websitesDB: IWebsiteRepository) {}

  postWebsite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { url } = postWebsiteSchema.parse(req.body);
      await this.websitesDB.addDataToDatabase(url);
      const allData = await this.websitesDB.getAllData();
      console.log(allData);
      res.status(201).send(allData);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error);
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      console.error("Database post error:", error);
    }
  };

  deleteWebsite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = deleteWebsiteSchema.parse(req.body);
      await this.websitesDB.deleteData(id);
      // const allData = await this.websitesDB.showAllData();
      // console.log(allData);
      res.sendStatus(204);
      // res.send(allData);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error);
        return;
      }
      res.status(500).json({ error: "Internal server error" });
      console.error("Database delete error:", error);
    }
  };

  getWebsites = async (req: Request, res: Response, next: NextFunction) => {
    const websites = await this.websitesDB.getAllData();
    res.send(websites);
    console.log(websites);
  };

  getSomething = async (req: Request, res: Response, next: NextFunction) => {
    res.send("something");
  };
}

// trzeba dodać global error handlera (middleware)
