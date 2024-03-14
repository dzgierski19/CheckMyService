import express, { NextFunction, Request, Response } from "express";
import { websiteRouter } from "./domains/websites/WebsiteRouter";
import { logRouter } from "./domains/logs/LogRouter";
import { validatorMiddleware } from "./middlewares/validationMiddleware";
import { errorHandler } from "./middlewares/errorHandler";
import { DomainError, PathError } from "./domains/errors/Errors";

export const app = express();
const port = 8500;

app.use(express.json());

app.use(websiteRouter);
app.use(logRouter);

app.use(errorHandler);

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   next(new PathError(`Can't reach path ${req.path}`));
// });

// cron.checkWebsites();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// errorHandling, cron, routes, zod, dodac validation middleware (ZOD)
