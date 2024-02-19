import { Router } from "express";
import { websiteController } from "../IoC";
export const websiteRouter = Router();

websiteRouter.post("/websites", websiteController.postWebsite);
websiteRouter.delete("/websites/", websiteController.deleteWebsite);
websiteRouter.get("/websites", websiteController.getWebsites);
websiteRouter.get("/webs", websiteController.getSomething);
