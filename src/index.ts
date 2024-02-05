import express, { Request, Response } from "express";

const app = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/api", (req: Request, res: Response) => {
  res.json([
    { name: "iPhone", price: 800 },
    { name: "iPad", price: 650 },
    { name: "iWatch", price: 750 },
  ]);
});
