import { v4 as uuidv4 } from "uuid";
import {
  deleteLogSchema,
  deleteWebsiteSchema,
  postLogSchema,
  postWebsiteSchema,
} from "../schemas/ValidateSchema";

describe("validator testing", () => {
  const randomUUID = uuidv4();
  describe("postWebsite testing", () => {
    it("should validate if data is valid", () => {
      const url = { body: { url: "https://example.com" } };
      const validation = postWebsiteSchema.safeParse(url);
      expect(validation.success).toBe(true);
    });
    it("should not validate if data is invalid", () => {
      const url = {
        body: {
          url: "https://example.com",
        },
        params: {
          id: randomUUID,
        },
      };
      const validation = postWebsiteSchema.safeParse(url);
      expect(validation.success).toBe(false);
    });
  });
  describe("deleteWebsite, postLog, deleteLog testing", () => {
    it("should validate if data is valid", () => {
      const id = { body: { id: randomUUID } };
      const deleteWebsiteValidation = deleteWebsiteSchema.safeParse(id);
      const postLogValidation = postLogSchema.safeParse(id);
      const deleteLogValidation = deleteLogSchema.safeParse(id);
      expect(deleteWebsiteValidation.success).toBe(true);
      expect(postLogValidation.success).toBe(true);
      expect(deleteLogValidation.success).toBe(true);
    });
    it("should not validate if data is invalid", () => {
      const id = { body: { id: "solana" } };
      const deleteWebsiteValidation = deleteWebsiteSchema.safeParse(id);
      const postLogValidation = postLogSchema.safeParse(id);
      const deleteLogValidation = deleteLogSchema.safeParse(id);
      expect(deleteWebsiteValidation.success).toBe(false);
      expect(postLogValidation.success).toBe(false);
      expect(deleteLogValidation.success).toBe(false);
    });
  });
});
