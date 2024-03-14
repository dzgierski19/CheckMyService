import { Router } from "express";
import { logController } from "../../IoC";
require("express-async-errors");

export const logRouter = Router();

logRouter.post("/logs", logController.postLog);
logRouter.get("/websites/:websiteId/logs/", logController.getLogs);
logRouter.get("/websites/:websiteId/logs/:logId", logController.getLog);
logRouter.delete("/logs", logController.deleteLog);
