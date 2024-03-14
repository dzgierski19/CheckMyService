import { prisma } from "../../IoC";
import { DomainError, ItemNotAvailableError } from "../errors/Errors";
import { ResponseStatus } from "../errors/ErrorTypes";
import { Website } from "./WebsiteTypes";

export interface IWebsiteRepository {
  createWebsite(url: string): Promise<void>;
  getWebsiteByName(url: string): Promise<Website | undefined>;
  getWebsiteByID(id: string): Promise<Website | undefined>;
  getAllWebsites(): Promise<Website[]>;
  countWebsites(): Promise<number>;
  deleteWebsite(id: string): Promise<void>;
  getDataById(id: string): Promise<Website | undefined>;
  getWebsiteWithLogsById(id: string): Promise<Website>;
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
    // throw new DomainError(`${name} not found`, ResponseStatus.BAD_REQUEST);
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
    // throw new DomainError(`${id} not found`, ResponseStatus.BAD_REQUEST);
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
    throw new ItemNotAvailableError(`${id} not found`);
  }

  async getDataById(id: string): Promise<Website> {
    const unique = await prisma.website.findFirst({
      where: { id: id, deleted_at: null },
      include: { logs: true },
    });
    if (unique) {
      //loadash
      return Website.create({
        id: unique.id,
        name: unique.website_url,
        createdAt: unique.created_at,
        deletedAt: unique.deleted_at,
        logs: unique.logs,
      });
    }
    throw new ItemNotAvailableError(`${id} not found`);
  }
}
