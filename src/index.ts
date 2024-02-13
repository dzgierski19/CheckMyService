import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { websitesRouter } from "./routes/WebsitesRouter";

const app = express();
const port = 8500;

app.use(websitesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
