import { CronJob } from "cron";
import { serv } from "./domains/services/ServicesDBHandler";

export const CRON_EVERY_10_SECONDS = new CronJob(
  "*/10 * * * * *", // cronTime
  async function main2() {
    const info = await serv.getInfoAboutUrl("https://www.ethereum.org");
  }, // onTick
  null, // onComplete
  true // start
);

// klasa
// metode która wyciąga websity z db i dla tych websitów odpala sprawdzenie stron i zapisanie tego do bazy danych
