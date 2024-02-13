import { Router } from "express";
import express from "express";
import { websiteController } from "../IoC";
export const websitesRouter = Router();

websitesRouter.post("/websites", express.json(), websiteController.postWebsite);
websitesRouter.delete(
  "/websites/",
  express.json(),
  websiteController.deleteWebsite
);
websitesRouter.get("/websites", websiteController.getWebsites);
websitesRouter.get("/webs", websiteController.getSomething);
