import z from "zod";

export const postWebsiteSchema = z.object({ url: z.string().url() });
export const deleteWebsiteSchema = z.object({ id: z.string().uuid() });
