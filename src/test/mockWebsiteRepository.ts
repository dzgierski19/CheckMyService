import { randomUUID } from "crypto";
import { IWebsiteRepository } from "../domains/websites/WebsiteRepository";
import { Website } from "../domains/websites/WebsiteTypes";

export class MockWebsiteRepository implements IWebsiteRepository {
  fakeDB: Website[] = [];

  async createWebsite(url: string) {
    const fakeWebsite = {
      id: randomUUID(),
      name: url,
      createdAt: new Date(),
      deletedAt: null,
      logs: [],
    };
    this.fakeDB.push(fakeWebsite);
  }

  async getWebsiteByName(url: string) {
    const website = this.fakeDB.find(
      (website) => website.name === url && !website.deletedAt
    );
    return website;
  }
  async getWebsiteByID(id: string): Promise<Website | undefined> {
    const website = this.fakeDB.find(
      (website) => website.id === id && !website.deletedAt
    );
    return website;
  }
  async getAllWebsites(): Promise<Website[]> {
    const filter = this.fakeDB.filter((website) => !website.deletedAt);
    console.log(filter);
    return filter;
  }
  async countWebsites(): Promise<number> {
    return this.fakeDB.length;
  }
  async deleteWebsite(id: string): Promise<void> {
    this.fakeDB.find((element) => {
      if (!element.deletedAt && element.id === id) {
        element.deletedAt = new Date();
      }
      return element;
    });
  }

  async getDataById(id: string): Promise<Website | undefined> {
    return this.fakeDB.find(
      (element) => element.id === id && !element.deletedAt
    );
  }
  async getWebsiteWithLogsById(id: string): Promise<Website | undefined> {
    return this.fakeDB.find((element) => {
      if (element.id === id && !element.deletedAt && element.logs.length) {
        return element;
      }
    });
  }
}
