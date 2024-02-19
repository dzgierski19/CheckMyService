import { CronJob } from "cron";
import { WebsiteService } from "./domains/services/WebsiteService";
import { websiteRepo } from "./IoC";
import { IWebsiteRepository } from "./domains/websites/WebsiteRepository";

// export const CRON_EVERY_10_SECONDS = new CronJob(
//   "*/10 * * * * *", // cronTime
//   async function main2() {
//     const info = websiteRepo.checkWebsite("https://www.ethereum.org");
//   }, // onTick
//   null, // onComplete
//   true // start
// );

export class CronCheck {
  constructor(private readonly websiteRepository: IWebsiteRepository) {}
  async executeCron(cronTime: string, url: string) {
    new CronJob(cronTime, async () => {
      this.websiteRepository.addLogsToDatabase(url);
    }).start();
  }
}

const cron = new CronCheck(websiteRepo);

// cron.executeCron("*/10 * * * * *", "https://www.ethereum.org");
// websiteRepo.addDataToDatabase("https://www.ethereum.org");
const data = websiteRepo
  .getDataWithLogs("https://www.bitcoin.org")
  .then((data) => {
    console.dir(data, { depth: null });
  });

// cron.executeCron("*/10 * * * * *", "https://www.cointelegraph.com");

// klasa
// metode która wyciąga websity z db i dla tych websitów odpala sprawdzenie stron i zapisanie tego do bazy danych
