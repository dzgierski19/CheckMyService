import { PrismaClient } from "@prisma/client";
import { WebsiteController } from "./controllers/WebsiteController";
import { WebsiteService } from "./domains/services/WebsiteService";
import { WebsiteRepository } from "./domains/websites/WebsiteRepository";

const websiteService = new WebsiteService();
export const websiteRepo = new WebsiteRepository(websiteService);
export const websiteController = new WebsiteController(websiteRepo);
export const prisma = new PrismaClient();
