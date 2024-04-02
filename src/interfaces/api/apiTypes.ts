import { IncomingHttpHeaders } from "http";
import { Request, Response } from "express";
import { ParsedQs } from "qs";

export type ExpressAnyRequestData = { params?: any; query?: any; body?: any };
export type ExpressRequest<
  T extends {
    query?: ParsedQs;
    body?: Record<string, unknown>;
    params?: Record<string, unknown>;
    locals: Record<string, unknown>;
  }
> = Request<T["params"], {}, T["body"], T["query"], T["locals"]>;

export type ParsedRequest<
  T extends {
    query?: ParsedQs;
    body?: Record<string, unknown>;
    params?: Record<string, unknown>;
  }
> = ExpressRequest<T & { locals: {} }>;
