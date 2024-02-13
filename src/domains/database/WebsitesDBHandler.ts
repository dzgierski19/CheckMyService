import { PrismaClient, websites } from "@prisma/client";
import { URL } from "url";

export interface IWebsitesDBHandler {
  addData(data: string): Promise<void>;
  showAllData(): Promise<websites[]>;
  deleteDataByWebsiteName(data: string): Promise<void>;
  deleteData(id: string): Promise<void>;
  deleteAllData(): Promise<void>;
  countData(): Promise<void>;
}

export class WebsitesDBHandler implements IWebsitesDBHandler {
  private readonly prisma = new PrismaClient();

  async addData(data: string) {
    const isUnique = await this.isUnique(data);
    if (isUnique) {
      throw new Error(`Duplicate data: ${isUnique.website_url}`);
    }
    const url = await this.fetchInfo(data);
    const newData = await this.prisma.websites.create({
      data: {
        website_url: url.url,
      },
    });
    console.log(newData.id);
  }

  async showAllData(): Promise<websites[]> {
    const data = await this.prisma.websites.findMany();
    return data;
  }

  async deleteDataByWebsiteName(data: string) {
    await this.prisma.websites.delete({
      where: { website_url: data },
    });
  }

  async deleteData(id: string) {
    await this.prisma.websites.delete({
      where: { id: id },
    });
  }

  async deleteAllData() {
    await this.prisma.websites.deleteMany({});
  }

  async countData() {
    const data = await this.prisma.websites.count();
    console.log(data);
  }

  private async fetchInfo(data: string) {
    const url = this.createURL(data);
    try {
      const response = await fetch(url);
      return response;
    } catch (err) {
      throw err;
    }
  }

  private createURL(data: string): URL {
    const url = new URL(data);
    return url;
  }

  private async isUnique(data: string) {
    const url = this.createURL(data);
    const fetchedData = await this.fetchInfo(data);
    const isUnique = await this.prisma.websites.findUnique({
      where: { website_url: fetchedData.url },
    });
    return isUnique;
  }
}
