import { Router } from "express";
import { logController } from "../../IoC";
import { validatorMiddleware } from "../../middlewares/validationMiddleware";
import { deleteLogSchema, postLogSchema } from "../../schemas/ValidateSchema";
require("express-async-errors");

export const logRouter = Router();
logRouter.post(
  "/logs",
  validatorMiddleware(postLogSchema),
  logController.postLog
);
logRouter.get("/websites/:websiteId/logs/", logController.getLogs);
logRouter.get("/websites/:websiteId/logs/:logId", logController.getLog);
logRouter.delete(
  "/logs",
  validatorMiddleware(deleteLogSchema),
  logController.deleteLog
);
