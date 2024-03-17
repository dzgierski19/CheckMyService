import { ItemNotAvailableError, URLError } from "../domains/errors/Errors";
import { WebsiteService } from "../domains/websites/WebsiteService";
import { MockWebsiteRepository } from "./mockWebsiteRepository";

const mockWebRep = new MockWebsiteRepository();
const mockWebServ = new WebsiteService(mockWebRep);
describe("Website service testing", () => {
  it("should add website to database", async () => {
    await mockWebServ.addWebsite("https://example.com");
    const websites = await mockWebRep.getAllWebsites();
    expect(websites[0].name).toBe("example.com/");
  });
  it("should return website", async () => {
    await mockWebServ.addWebsite("https://ethereum.org");
    const websites = await mockWebServ.getAllWebsites();
    expect(websites[0].name).toBe("ethereum.org/");
  });
  it("should add all websites to database", async () => {
    await mockWebServ.addWebsite("https://ethereum.org");
    await mockWebServ.addWebsite("https://litecoin.org");
    await mockWebServ.addWebsite("https://bitcoin.org");
    const websitesNumber = await mockWebServ.getAllWebsites();
    expect(websitesNumber.length).toBe(3);
  });
  it("should remove deleted website from database", async () => {
    await mockWebServ.addWebsite("https://ethereum.org");
    await mockWebServ.addWebsite("https://litecoin.org");
    await mockWebServ.addWebsite("https://bitcoin.org");
    const ethWebsiteId = await mockWebServ.getWebsiteId("ethereum.org/");
    await mockWebServ.deleteWebsite(ethWebsiteId);
    const websitesNumber = await mockWebServ.getAllWebsites();
    expect(websitesNumber.length).toBe(2);
  });
  describe("should throw an Error when: ", () => {
    it("given URL doesn't exist", () => {
      async function addWebsite() {
        await mockWebServ.addWebsite("BAD URL");
      }
      expect(addWebsite).rejects.toThrow(URLError);
    });
    it("trying to delete item that is already deleted", () => {
      async function deleteWebsite() {
        await mockWebServ.addWebsite("https://example.com");
        const id = await mockWebServ.getWebsiteId("example.com/");
        await mockWebServ.deleteWebsite(id);
        await mockWebServ.deleteWebsite(id);
      }
      expect(deleteWebsite).rejects.toThrow(ItemNotAvailableError);
    });
    it("trying to get website that is deleted", () => {
      async function getWebsite() {
        await mockWebServ.addWebsite("https://example.com");
        const id = await mockWebServ.getWebsiteId("example.com/");
        await mockWebServ.deleteWebsite(id);
        await mockWebServ.getWebsite(id);
      }
      expect(getWebsite).rejects.toThrow(ItemNotAvailableError);
    });
  });
});
