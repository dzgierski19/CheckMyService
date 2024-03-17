import { randomUUID } from "crypto";
import { IWebsiteRepository } from "../domains/websites/WebsiteRepository";
import { Website } from "../domains/websites/WebsiteTypes";
import { WebsiteService } from "../domains/websites/WebsiteService";

export class MockWebsiteRepository implements IWebsiteRepository {
  private readonly fakeDB: Website[] = [];

  async createWebsite(url: string) {
    const fakeUrl = {
      id: randomUUID(),
      name: url,
      createdAt: new Date(),
      deletedAt: null,
      logs: [],
    };
    this.fakeDB.push(fakeUrl);
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
    return this.fakeDB.reduce(
      (element, item) => (!item.deletedAt ? (element += 1) : (element += 0)),
      0
    );
  }
  async deleteWebsite(id: string): Promise<void> {
    this.fakeDB.map((element) => {
      if (!element.deletedAt && element.id === id) {
        element.deletedAt = new Date();
      }
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

const mockrepo = new MockWebsiteRepository();

export const webserv = new WebsiteService(mockrepo);

// webserv.addWebsite("https://delete.pl").then(() => {
//   webserv.getAllWebsites().then((data) => {
//     const id = data[0].id;
//     webserv.deleteWebsite(id).then(() => {
//       webserv.getAllWebsites().then((data) => {});
//     });
//   });
// });
