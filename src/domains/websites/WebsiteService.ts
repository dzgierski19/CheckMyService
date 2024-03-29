import {
  DomainError,
  DuplicateError,
  ItemNotAvailableError,
  URLError,
} from "../errors/Errors";
import { ResponseStatus } from "../errors/ErrorTypes";
import { IWebsiteRepository } from "./WebsiteRepository";
import { Website } from "./WebsiteTypes";
import axios, { Axios, AxiosError, AxiosResponse, isAxiosError } from "axios";

export interface IWebsiteService {
  addWebsite(url: string): Promise<void>;
  getWebsiteUrl(id: string): Promise<string>;
  getWebsiteId(url: string): Promise<string>;
  getAllWebsites(): Promise<Website[]>;
  deleteWebsite(id: string): Promise<void>;
  getWebsite(id: string): Promise<Website>;
  getResponseFromUrl(url: string): Promise<AxiosResponse<any, any>>;
}

export class WebsiteService implements IWebsiteService {
  constructor(private readonly websiteRepository: IWebsiteRepository) {}

  async addWebsite(url: string) {
    const urlInfo = this.getHostAndPathnameFromURL(url);
    const checkedURL = this.checkFirst4Letters(urlInfo);
    const website = await this.websiteRepository.getWebsiteByName(checkedURL);
    if (website) {
      throw new DuplicateError(`Duplicate domain: ${checkedURL}`);
    }
    await this.getResponseFromUrl(`https://` + checkedURL);
    await this.websiteRepository.createWebsite(checkedURL);
  }

  async getResponseFromUrl(url: string): Promise<AxiosResponse<any, any>> {
    try {
      const response = await axios.get(url);
      return response;
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.code === "ENOTFOUND") {
          throw new AxiosError(err.message);
        }
      }
      throw new AxiosError("Axios error");
    }
  }

  async getAllWebsites() {
    const websites = await this.websiteRepository.getAllWebsites();
    return websites;
  }

  async getWebsiteUrl(id: string) {
    const website = await this.websiteRepository.getWebsiteByID(id);
    if (website) {
      return website.name;
    }
    throw new ItemNotAvailableError(`${id} is not available in database`);
  }

  async getWebsiteId(url: string) {
    const website = await this.websiteRepository.getWebsiteByName(url);
    if (website) {
      return website.id;
    }
    throw new ItemNotAvailableError(`${url} is not available in database`);
  }

  async getWebsite(id: string) {
    const website = await this.websiteRepository.getWebsiteByID(id);
    if (website) {
      return Website.create(website);
    }
    throw new ItemNotAvailableError(`${id} not available`);
  }

  async deleteWebsite(id: string) {
    const website = await this.getWebsite(id);
    if (website) {
      // if (website.deletedAt) {
      //   throw new ItemNotAvailableError("Website is already deleted");
      // }
      await this.websiteRepository.deleteWebsite(id);
    }
  }

  private getHostAndPathnameFromURL(url: string): string {
    try {
      const checkedURL = new URL(url);
      return checkedURL.host + checkedURL.pathname;
    } catch (err) {
      throw new URLError("Please type proper URL");
    }
  }
  private checkFirst4Letters(url: string): string {
    return url.slice(0, 4) === "www." ? url.slice(4) : url;
  }
}
