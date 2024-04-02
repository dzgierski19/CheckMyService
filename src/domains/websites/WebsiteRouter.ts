import { Router } from "express";
import { websiteController } from "../../IoC";
import { validatorMiddleware } from "../../middlewares/validationMiddleware";
import {
  deleteWebsiteSchema,
  getReportSchema,
  postWebsiteSchema,
  websitePaginationSchema,
} from "../../schemas/ValidateSchema";

require("express-async-errors");

export const websiteRouter = Router();

websiteRouter.post(
  "/websites",
  validatorMiddleware(postWebsiteSchema),
  websiteController.postWebsite
);
websiteRouter.delete(
  "/websites/:websiteId",
  validatorMiddleware(deleteWebsiteSchema),
  websiteController.deleteWebsite
);
websiteRouter.get(
  "/websites",
  // validatorMiddleware(websitePaginationSchema),
  websiteController.getWebsites
);
websiteRouter.get(
  "/websites/:websiteId/logs/report",
  // validatorMiddleware(getReportSchema),
  websiteController.getWebsiteReport
);
