import express from "express";
import { websiteRouter } from "./routes/WebsiteRouter";

const app = express();
const port = 8500;

app.use(express.json());
app.use(websiteRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
