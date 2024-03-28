import { ItemNotAvailableError, URLError } from "../domains/errors/Errors";
import { WebsiteService } from "../domains/websites/WebsiteService";
import { MockWebsiteRepository } from "./mockWebsiteRepository";

describe("Website service testing", () => {
  let mockWebRep: MockWebsiteRepository;
  let mockWebServ: WebsiteService;
  beforeEach(async () => {
    mockWebRep = new MockWebsiteRepository();
    mockWebServ = new WebsiteService(mockWebRep);
  });

  it("should add website to database", async () => {
    await mockWebServ.addWebsite("https://ethereum.org");
    const websites = await mockWebRep.getAllWebsites();
    expect(websites[0].name).toBe("ethereum.org/");
  });
  it("should add all websites to database", async () => {
    await mockWebServ.addWebsite("https://ethereum.org");
    await mockWebServ.addWebsite("https://litecoin.org");
    await mockWebServ.addWebsite("https://bitcoin.org");
    const websites = await mockWebServ.getAllWebsites();
    expect(websites.length).toBe(3);
  });
  it("should remove deleted website from database", async () => {
    await mockWebServ.addWebsite("https://ethereum.org");
    await mockWebServ.addWebsite("https://litecoin.org");
    await mockWebServ.addWebsite("https://bitcoin.org");
    const ethWebsiteId = await mockWebServ.getWebsiteId("ethereum.org/");
    await mockWebServ.deleteWebsite(ethWebsiteId);
    const websites = await mockWebServ.getAllWebsites();
    expect(websites.length).toBe(2);
  });
  describe("should throw an Error when: ", () => {
    it("given URL doesn't exist", async () => {
      await expect(mockWebServ.addWebsite("BAD URL")).rejects.toThrow(URLError);
    });
    it("trying to delete item that is already deleted", async () => {
      await mockWebServ.addWebsite("https://ethereum.org");
      const id = await mockWebServ.getWebsiteId("ethereum.org/");
      await mockWebServ.deleteWebsite(id);
      await expect(mockWebServ.deleteWebsite(id)).rejects.toThrow(
        ItemNotAvailableError
      );
    });
    it("trying to get website that is deleted", async () => {
      await mockWebServ.addWebsite("https://ethereum.org");
      const id = await mockWebServ.getWebsiteId("ethereum.org/");
      await mockWebServ.deleteWebsite(id);
      await expect(mockWebServ.getWebsite(id)).rejects.toThrow(
        ItemNotAvailableError
      ); //
    });
  });
});
