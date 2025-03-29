// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { execSync } from "child_process";
import * as fs from "fs";
import { ENV } from "../../config/env.config";
import { getInput } from "../console.utils";
import { getFilePaths, readFile, writeFile } from "../file.utils";

jest
  .mock("child_process")
  .mock("fs")
  .mock("../../config/env.config", () => ({
    ENV: {
      rootPath: "/root",
      scan: {
        source: "file",
        excludedFolders: ["excluded"],
        rootDirectory: "/root/project",
        testFileExtensions: [".test.ts", ".spec.ts"],
        testFilePath: "/root/project/test.test.ts",
      },
    },
  }))
  .mock("../console.utils");

const mockFs = fs as jest.Mocked<typeof fs>;

describe("getFilePath", () => {
  const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;
  const mockGetInput = getInput as jest.MockedFunction<typeof getInput>;

  afterEach(() => {
    mockExecSync.mockRestore();
    mockGetInput.mockRestore();
  });

  it("should get file paths from console input", async () => {
    ENV.scan.source = "console";
    mockGetInput.mockResolvedValue("test/test.ts");

    const result = await getFilePaths();
    expect(result).toEqual(["/root/test/test.ts"]);
    expect(mockGetInput).toHaveBeenCalledWith("Enter the test cases file path: ");
  });

  it("should get file paths from file path in ENV", async () => {
    ENV.scan.source = "file";

    const result = await getFilePaths();
    expect(result).toEqual(["/root/project/test.test.ts"]);
  });

  it("should get file paths from git status", async () => {
    ENV.scan.source = "git";
    mockExecSync.mockReturnValue(" M test.test.ts\n?? new.spec.ts\n");

    const result = await getFilePaths();
    expect(result).toEqual(["test.test.ts", "new.spec.ts"]);
    expect(mockExecSync).toHaveBeenCalledWith("git status --porcelain", { encoding: "utf8" });
  });

  it("should get file paths from root directory", async () => {
    ENV.scan.source = "root";
    mockFs.readdirSync.mockReturnValue(["test.test.ts", "excluded", "other.js"]);
    mockFs.statSync.mockReturnValue({ isDirectory: () => false } as fs.Stats);
    mockFs.statSync.mockImplementation(
      (filePath: string) =>
        ({
          isDirectory: () => filePath === "/root/project/excluded",
        }) as fs.Stats,
    );
    mockFs.readdirSync.mockImplementation((dir: string) => {
      if (dir === "/root/project/excluded") {
        return ["excludedTest.test.ts"];
      }
      return ["test.test.ts", "excluded", "other.js"];
    });

    const result = await getFilePaths();
    expect(result).toEqual(["/root/project/test.test.ts"]);
  });

  it("should throw an error for invalid source", async () => {
    ENV.scan.source = "invalid";

    await expect(getFilePaths()).rejects.toThrow("Invalid source");
  });
});

describe("readFile", () => {
  it("should read file content successfully", () => {
    const filePath = "test.txt";
    const fileContent = "This is the file content.";
    mockFs.readFileSync.mockReturnValue(fileContent);

    expect(readFile(filePath)).toBe(fileContent);
    expect(mockFs.readFileSync).toHaveBeenCalledWith(filePath, "utf8");
  });
});

describe("writeFile", () => {
  it("should write file content successfully", () => {
    const filePath = "test.txt";
    const content = "This is the file content.";
    mockFs.writeFileSync.mockReturnValue(content);

    writeFile(filePath, content);
    expect(mockFs.writeFileSync).toHaveBeenCalledWith(filePath, content, "utf8");
  });
});
