import { ItemNotAvailableError } from "../domains/errors/Errors";
import { LogRepository } from "../domains/logs/LogRepository";
import { LogService } from "../domains/logs/LogService";
import { WebsiteRepository } from "../domains/websites/WebsiteRepository";
import { WebsiteService } from "../domains/websites/WebsiteService";
import { MockLogRepository } from "./mockLogRepository";
import { MockWebsiteRepository } from "./mockWebsiteRepository";

describe("Testing log service class", () => {
  let mockWebRep: WebsiteRepository;
  let mockWebServ: WebsiteService;
  let mockLogRep: LogRepository;
  let mockLogServ: LogService;
  beforeEach(() => {
    mockWebRep = new MockWebsiteRepository();
    mockWebServ = new WebsiteService(mockWebRep);
    mockLogRep = new MockLogRepository();
    mockLogServ = new LogService(mockLogRep, mockWebServ);
  });
  it("should create log for website", async () => {
    await mockWebServ.addWebsite("https://www.ethereum.org");
    const websites = await mockWebServ.getAllWebsites();
    await mockLogServ.addLogForWebsite(websites[0].id);
    const logs = await mockLogServ.getAllLogs(websites[0].id);
    expect(logs[0].websiteId).toBe(websites[0].id);
  });
  it("should delete log", async () => {
    await mockWebServ.addWebsite("https://www.ethereum.org");
    const websites = await mockWebServ.getAllWebsites();
    await mockLogServ.addLogForWebsite(websites[0].id);
    const logs = await mockLogServ.getAllLogs(websites[0].id);
    await mockLogServ.deleteLog(logs[0].id);
    const logsAfterDeleting = await mockLogServ.getAllLogs(websites[0].id);
    expect(logsAfterDeleting).toHaveLength(0);
  });

  describe("It should throw an error when: ", () => {
    it("adds log for website that is not available", async () => {
      await mockWebServ.addWebsite("https://www.ethereum.org");
      const websites = await mockWebServ.getAllWebsites();
      await mockWebServ.deleteWebsite(websites[0].id);
      await expect(
        mockLogServ.addLogForWebsite(websites[0].id)
      ).rejects.toThrow(ItemNotAvailableError);
    });
    it("trying to get log that is not available", async () => {
      await expect(mockLogServ.getLog("BAD ID")).rejects.toThrow(
        ItemNotAvailableError
      );
    });
    it("trying to delete log that is not available", async () => {
      await mockWebServ.addWebsite("https://www.ethereum.org");
      const websites = await mockWebServ.getAllWebsites();
      await mockLogServ.addLogForWebsite(websites[0].id);
      const logs = await mockLogServ.getAllLogs(websites[0].id);
      await mockLogServ.deleteLog(logs[0].id);
      await expect(mockLogServ.deleteLog(logs[0].id)).rejects.toThrow(
        ItemNotAvailableError
      );
    });
  });
});
