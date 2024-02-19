import { PrismaClient, Website } from "@prisma/client";
import { IWebsiteService } from "../services/WebsiteService";
import { Log, WebsiteWithLogs } from "../types/Types";
import { prisma } from "../../IoC";

export interface IWebsiteRepository {
  addDataToDatabase(data: string): Promise<void>;
  getAllData(): Promise<Website[]>;
  deleteDataByWebsiteName(data: string): Promise<void>;
  deleteData(id: string): Promise<void>;
  deleteAllData(): Promise<void>;
  countData(): Promise<void>;
  getData(data: string): Promise<string>;
  addLogsToDatabase(url: string): Promise<void>;
  getLogs(url: string): Promise<Log[]>;
  getDataWithLogs(url: string): Promise<WebsiteWithLogs[]>;
}

export class WebsiteRepository implements IWebsiteRepository {
  constructor(private readonly websiteService: IWebsiteService) {}

  async addDataToDatabase(url: string) {
    const checkedUrl = await this.websiteService.getInfoAboutUrl(url);
    const isUnique = await this.isUnique(checkedUrl.name);
    if (isUnique) {
      throw new Error(`Duplicate data: ${url}`);
    }
    const newData = await prisma.website.create({
      data: {
        website_url: url,
      },
    });
    console.log(newData.id);
  }

  async checkDataId(url: string) {
    const unique = await prisma.website.findFirst({
      where: { website_url: url },
    });
    if (unique) {
      return unique.id;
    }
  }

  async deleteLogs(url: string) {
    await prisma.log.updateMany({
      where: { website_url: url },
      data: { deleted_at: new Date() },
    });
  }

  async addLogsToDatabase(url: string) {
    await this.getData(url);
    const { name, httpCode, status } =
      await this.websiteService.getInfoAboutUrl(url);
    const id = await this.checkDataId(url);
    await prisma.log.create({
      data: {
        website_url: name,
        http_code: httpCode,
        status: status,
        websiteId: id,
      },
    });
  }

  async getLogs(url: string): Promise<Log[]> {
    const result = await prisma.log.findMany({
      where: { website_url: url },
    });
    return result;
  }

  async countLogs(url: string): Promise<number> {
    const result = await prisma.log.count({ where: { website_url: url } });
    return result;
  }

  async getAllData(): Promise<Website[]> {
    const data = await prisma.website.findMany({
      where: { deleted_at: null },
    });
    return data;
  }

  async getData(data: string): Promise<string> {
    const unique = await prisma.website.findFirst({
      where: { website_url: data },
    });
    if (unique) {
      return unique.website_url;
    }
    throw new Error("Data not available");
  }

  async getDataWithLogs(url: string) {
    const website = await prisma.website.findMany({
      where: { website_url: url },
      include: { logs: true },
    });
    if (website) {
      return website;
    }
    throw new Error("Data not available");
  }

  async deleteDataByWebsiteName(data: string) {
    await prisma.website.update({
      where: { website_url: data },
      data: { deleted_at: new Date() },
    });
  }

  async deleteData(id: string) {
    await prisma.website.update({
      where: { id: id },
      data: { deleted_at: new Date() },
    });
  }

  async deleteAllData() {
    await prisma.website.deleteMany({});
  }

  async countData() {
    const data = await prisma.website.count();
    console.log(data);
  }

  private async fetchInfo(data: string) {
    // const url = this.createURL(data);
    try {
      const response = await fetch(data);
      return response;
      // dodac bledy nieobjete err
    } catch (err) {
      throw err;
    }
  }

  private async isUnique(data: string | undefined) {
    const isUnique = await prisma.website.findUnique({
      where: { website_url: data },
    });
    return isUnique;
  }
}
