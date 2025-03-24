import type { TestCase } from "./test-case.definitions";

export type Api = {
  username: string;
  password: string;
  organizationUrl: string;
  projectId: string;
  suiteId: string;
};

export type Scan = {
  source: "console" | "file" | "git" | "root" | "pipeline";
  testFilePath: string;
  rootDirectory: string;
  testFileExtensions: string[];
  excludedFolders: string[];
};

export type Config = {
  api: Api;
  rootPath: string;
  scan: Scan;
  testCase: TestCase;
};
