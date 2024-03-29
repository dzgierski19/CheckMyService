import z from "zod";

export const postWebsiteSchema = z.object({
  body: z.object({ url: z.string().url() }),
});

export const deleteWebsiteSchema = z.object({
  body: z.object({ id: z.string().uuid() }),
});

export const postLogSchema = z.object({
  body: z.object({ id: z.string().uuid() }),
});

export const deleteLogSchema = z.object({
  body: z.object({
    id: z.string().uuid(),
  }),
});

const validateParams = z.object({ websiteId: z.string().uuid() });
const validateQuery = z.object({
  // start: z.coerce.date(),
  // finish: z.coerce.date(),
  start: z.string(),
  finish: z.string(),
});

export const getRaportSchema = z.object({
  params: validateParams,
  query: validateQuery,
});

export const websitesPaginationSchema = z.object({
  query: z.object({
    page: z.number(),
    limit: z.number(),
  }),
});

export const logPaginationSchema = z.object({
  params: z.object({ websiteId: z.string().uuid() }),
  query: z.object({
    page: z.number(),
    limit: z.number(),
  }),
});

export type postWebsiteRequest = z.infer<typeof postWebsiteSchema>;
export type deleteWebsiteRequest = z.infer<typeof deleteWebsiteSchema>;
export type postLogRequest = z.infer<typeof postLogSchema>;
export type deleteLogRequest = z.infer<typeof deleteLogSchema>;
export type getRaportRequest = z.infer<typeof getRaportSchema>;
export type websitePaginationRequest = z.infer<typeof websitesPaginationSchema>;
export type logPaginationRequest = z.infer<typeof logPaginationSchema>;
