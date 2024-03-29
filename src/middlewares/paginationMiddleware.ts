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
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {} as result<T>;
    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result.results = model.slice(startIndex, endIndex);
    console.log(result);
    req.body = result;
    next();
  };
}
