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
// vebsiteIdValidator
const validateReportParams = z.object({ websiteId: z.string().uuid() });
const validateReportQuery = z.object({
  start: z.string(),
  finish: z.string(),
  // start: z.string(),
  // finish: z.string(),
});

export const getReportSchema = z.object({
  params: validateReportParams,
  query: validateReportQuery,
});

export const websitePaginationSchema = z.object({
  query: z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  }),
});

export const logPaginationSchema = z.object({
  query: z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  }),
  params: z.object({ websiteId: z.string().uuid() }),
});

export const getLogSchema = z.object({
  params: z.object({ websiteId: z.string().uuid(), logId: z.string().uuid() }),
});

export type postWebsiteRequest = z.infer<typeof postWebsiteSchema>;
export type deleteWebsiteRequest = z.infer<typeof deleteWebsiteSchema>;
export type postLogRequest = z.infer<typeof postLogSchema>;
export type deleteLogRequest = z.infer<typeof deleteLogSchema>;
export type getReportRequest = z.infer<typeof getReportSchema>;
export type websitePaginationRequest = z.infer<typeof websitePaginationSchema>;
export type logPaginationRequest = z.infer<typeof logPaginationSchema>;
export type getLogRequest = z.infer<typeof getLogSchema>;
