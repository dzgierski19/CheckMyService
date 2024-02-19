export type WebsiteInfo = {
  name: string | undefined;
  httpCode: number;
  status: string;
};

export type WebsiteStatus = {
  status: "RUNNING" | "DOWN";
};

export type Log = {
  id: number;
  created_at: Date;
  website_url: string | null;
  http_code: number;
  status: string;
  deleted_at: Date | null;
  websiteId: string;
};

export type Website = {
  id: string;
  website_url: string;
  created_at: Date;
  deleted_at: Date | null;
};

export type WebsiteWithLogs = Website & { logs: Log[] };
