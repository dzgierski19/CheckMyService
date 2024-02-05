import z from "zod";

export const checkWebsiteSchema = z.string().url();
