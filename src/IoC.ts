import { PrismaClient } from "@prisma/client";
import { WebsiteService } from "./domains/websites/WebsiteService";
import { WebsiteRepository } from "./domains/websites/WebsiteRepository";
import { LogRepository } from "./domains/logs/LogRepository";
import { LogService } from "./domains/logs/LogService";
import { WebsiteController } from "./domains/websites/WebsiteController";
import { LogController } from "./domains/logs/LogController";
import { Cron } from "./Cron";
import { CSVService } from "./CSVService";
import path from "path";

export const CRON_EVERY_10_SECONDS = "*/10 * * * * *";
export const PATH_TO_CRON_CSV = path.join(__dirname, "WebsiteData.csv");
export const PATH_TO_RAPORT_CSV = path.join(__dirname, "WebsiteReport.csv");

export const prisma = new PrismaClient();
export const websiteRepo = new WebsiteRepository();
export const websiteService = new WebsiteService(websiteRepo);
const logRepository = new LogRepository();
export const logService = new LogService(logRepository, websiteService);
export const websiteController = new WebsiteController(websiteService);
export const logController = new LogController(logService, websiteService);
export const csvService = new CSVService(websiteService, logService);
export const cron = new Cron(csvService);
cron.checkWebsites(PATH_TO_CRON_CSV);
