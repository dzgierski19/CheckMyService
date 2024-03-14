import z from "zod";

export const postWebsiteSchema = z
  .object({
    body: z.object({ url: z.string().url() }),
  })
  .strict();

export const deleteWebsiteSchema = z
  .object({
    body: z.object({ id: z.string().uuid() }),
  })
  .strict();

export const postLogSchema = z
  .object({
    body: z.object({ id: z.string().uuid() }),
  })
  .strict();

export const deleteLogSchema = z
  .object({
    body: z.object({
      id: z.string().uuid(),
    }),
  })
  .strict();

export type postWebsiteRequest = z.infer<typeof postWebsiteSchema>;
export type deleteWebsiteRequest = z.infer<typeof deleteWebsiteSchema>;
export type postLogRequest = z.infer<typeof postLogSchema>;
export type deleteLogRequest = z.infer<typeof deleteLogSchema>;
