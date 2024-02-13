import z from "zod";

export const postWebsiteSchema = z.object({ data: z.string().url() });
export const deleteWebsiteSchema = z.object({ id: z.string().uuid() });
