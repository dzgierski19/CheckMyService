import axios, { AxiosResponse } from "axios";
import { WebsiteInfo } from "../types/Types";
import { PrismaClient } from "@prisma/client";

export interface IWebsiteService {
  getResponseFromUrl(url: string): Promise<AxiosResponse>;
  getInfoAboutUrl(url: string): Promise<WebsiteInfo>;
  // checkUrl(url: string): Promise<void>;
}

export class WebsiteService implements IWebsiteService {
  private readonly prisma = new PrismaClient();

  async getResponseFromUrl(url: string) {
    const response = await axios.get(url);
    return response;
  }

  async getInfoAboutUrl(url: string) {
    const response = await this.getResponseFromUrl(url);
    const { config, status } = response;
    const urlName = config.url;
    const httpCode = status;
    const httpStatus = status !== 200 ? "DOWN" : "RUNNING";
    const checkedUrl = {
      name: urlName,
      httpCode: httpCode,
      status: httpStatus,
    };
    console.log(checkedUrl);
    return checkedUrl;
  }

  // async checkUrl(url: string) {
  //   const { name, httpCode, status } = await this.getInfoAboutUrl(url);
  //   await this.prisma.log.create({
  //     data: {
  //       name: name,
  //       http_code: httpCode,
  //       status: status,
  //       websiteId: name,
  //     },
  //   });
  // }
}

//constroler (http => req, res)
//serwis (biznes => sprawdzic czy cos jest dzialajacym url i przekazac do zapisu)
//repozytoria (adaptery) => jest porozumiewanie się z innymi systemami lub baza danych
