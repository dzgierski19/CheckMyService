import { PrismaClient } from "@prisma/client";
import { WebsiteService } from "./domains/websites/WebsiteService";
import { WebsiteRepository } from "./domains/websites/WebsiteRepository";
import { LogRepository } from "./domains/logs/LogRepository";
import { LogService } from "./domains/logs/LogService";
import { WebsiteController } from "./domains/websites/WebsiteController";
import { LogController } from "./domains/logs/LogController";
import { Cron } from "./Cron";

export const CRON_EVERY_10_SECONDS = "*/10 * * * * *";

export const prisma = new PrismaClient();
export const websiteRepo = new WebsiteRepository();
export const websiteService = new WebsiteService(websiteRepo);
const logRepository = new LogRepository();
export const logService = new LogService(logRepository, websiteService);
export const websiteController = new WebsiteController(websiteService);
export const logController = new LogController(logService, websiteService);
export const cron = new Cron(logService, websiteService);
