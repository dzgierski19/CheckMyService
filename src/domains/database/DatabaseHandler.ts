import { PrismaClient } from "@prisma/client";
import { URL } from "url";

const prisma = new PrismaClient();

class DatabaseHandler {
  private readonly prisma = new PrismaClient();

  async addData(data: string) {
    const url = await this.fetchInfo(data);
    const reponse = url.ok ? "Running" : "Down";
    console.log(typeof url.status);
    await prisma.serviceList.create({
      data: {
        url: url.url,
        status: reponse,
        httpCode: url.status,
      },
    });
  }

  async showAllData() {
    const data = await prisma.serviceList.findMany();
    console.log(data);
  }

  private async fetchInfo(data: string) {
    const url = this.checkIfUrlIsValid(data);
    try {
      const response = await fetch(url);
      return response;
    } catch (err) {
      throw err;
    }
  }

  private checkIfUrlIsValid(data: string): URL {
    const url = new URL(data);
    return url;
  }
}

const data = new DatabaseHandler();
data
  .addData("https://google.pl")
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
