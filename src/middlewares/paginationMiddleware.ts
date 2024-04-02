import { NextFunction, Request, Response } from "express";
import {
  logPaginationRequest,
  websitePaginationRequest,
} from "../schemas/ValidateSchema";
import { ParsedRequest } from "../interfaces/api/apiTypes";

type paginate = Record<"next" | "previous", { page: number; limit: number }>;
type result<T> = paginate & Record<"results", T[]>;

export function paginate<T>(model: T[]) {
  return (
    req: ParsedRequest<websitePaginationRequest | logPaginationRequest>,
    res: Response,
    next: NextFunction
  ) => {
    const { page, limit } = req.query;
    const limitToNumber = +limit;
    const pageToNumber = +page;
    const startIndex = (pageToNumber - 1) * limitToNumber;
    const endIndex = pageToNumber * limitToNumber;
    const result = {} as result<T>;
    if (endIndex < model.length) {
      result.next = {
        page: pageToNumber + 1,
        limit: limitToNumber,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: pageToNumber - 1,
        limit: limitToNumber,
      };
    }

    result.results = model.slice(startIndex, endIndex);
    console.log(result);
    req.body = result;
    next();
  };
}
