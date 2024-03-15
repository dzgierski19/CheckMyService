import { prisma } from "../../IoC";
import { Website } from "./WebsiteTypes";

export interface IWebsiteRepository {
  createWebsite(url: string): Promise<void>;
  getWebsiteByName(url: string): Promise<Website | undefined>;
  getWebsiteByID(id: string): Promise<Website | undefined>;
  getAllWebsites(): Promise<Website[]>;
  countWebsites(): Promise<number>;
  deleteWebsite(id: string): Promise<void>;
  getWebsiteWithLogsById(id: string): Promise<Website | undefined>;
}

export class WebsiteRepository implements IWebsiteRepository {
  constructor() {}

  async createWebsite(url: string) {
    const newData = await prisma.website.create({ data: { website_url: url } });
    console.log(newData.id);
  }

  async getWebsiteByName(name: string) {
    const website = await prisma.website.findFirst({
      where: { website_url: name, deleted_at: null },
      include: { logs: true },
    });
    if (website) {
      return Website.create({
        id: website.id,
        name: website.website_url,
        createdAt: website.created_at,
        deletedAt: website.deleted_at,
        logs: website.logs,
      });
    }
  }

  async getWebsiteByID(id: string) {
    const website = await prisma.website.findFirst({
      where: { id: id, deleted_at: null },
      include: { logs: true },
    });
    if (website) {
      return Website.create({
        id: website.id,
        name: website.website_url,
        createdAt: website.created_at,
        deletedAt: website.deleted_at,
        logs: website.logs,
      });
    }
  }

  async getAllWebsites(): Promise<any> {
    const allWebsites = await prisma.website.findMany({
      where: { deleted_at: null },
      include: { logs: true },
    });

    return allWebsites.map((website) =>
      Website.create({
        id: website.id,
        name: website.website_url,
        createdAt: website.created_at,
        deletedAt: website.deleted_at,
        logs: website.logs,
      })
    );
  }

  async countWebsites(): Promise<number> {
    const number = await prisma.website.count({ where: { deleted_at: null } });
    return number;
  }

  async deleteWebsite(id: string) {
    await prisma.website.update({
      where: { id: id },
      data: { deleted_at: new Date() },
    });
  }

  async getWebsiteWithLogsById(id: string) {
    const website = await prisma.website.findFirst({
      where: { id: id, deleted_at: null },
      include: { logs: true },
    });
    if (website) {
      return Website.create({
        id: website.id,
        name: website.website_url,
        createdAt: website.created_at,
        deletedAt: website.deleted_at,
        logs: website.logs,
      });
    }
  }
}
