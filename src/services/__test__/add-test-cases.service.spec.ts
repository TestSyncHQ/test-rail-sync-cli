import { addCase } from "../../api/test-rail.api";
import { getFilePaths, readFile, writeFile } from "../../utils/file.utils";
import { extractDescriptionsWithoutId, replaceDescriptions } from "../../utils/test-case.utils";
import { addTestCasesService } from "../add-test-cases.service";

jest
  .mock("../../api/test-rail.api", () => ({
    addCase: jest.fn(),
  }))
  .mock("../../config/env.config", () => ({
    ENV: {
      scan: { source: "file" },
      testCase: { section_id: 789 },
    },
  }))
  .mock("../../utils/console.utils", () => ({
    promptTestCaseOptions: jest.fn(),
  }))
  .mock("../../utils/file.utils", () => ({
    getFilePaths: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  }))
  .mock("../../utils/test-case.utils", () => ({
    extractDescriptionsWithoutId: jest.fn(),
    replaceDescriptions: jest.fn(),
  }));

describe("addTestCasesService", () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("should add test cases successfully", async () => {
    const mockFilePaths = { "file1.ts": "path/to/file1.ts" };
    (getFilePaths as jest.Mock).mockResolvedValue(mockFilePaths);

    const mockDescriptions = [[undefined, "Test Case 1"]];
    (extractDescriptionsWithoutId as jest.Mock).mockReturnValue(mockDescriptions);
    (replaceDescriptions as jest.Mock).mockReturnValue("file content");

    (readFile as jest.Mock).mockReturnValue("file content");

    const mockTestCase = { id: 1, title: "Test Case 1", section_id: 789 };
    (addCase as jest.Mock).mockResolvedValue(mockTestCase);

    await addTestCasesService();
    expect(true).toBeTruthy();
    expect(getFilePaths).toHaveBeenCalled();
    expect(extractDescriptionsWithoutId).toHaveBeenCalledWith("file content");
    expect(addCase).toHaveBeenCalledWith({ section_id: 789, title: "Test Case 1" });
    expect(replaceDescriptions).toHaveBeenCalledWith("file content", [mockTestCase]);
    expect(writeFile).toHaveBeenCalledWith("file1.ts", "file content");
    expect(consoleLogSpy).toHaveBeenCalledWith("1 test cases added to TestRail");
  });

  it("should handle errors when adding test cases", async () => {
    (getFilePaths as jest.Mock).mockResolvedValue({ "file1.ts": "path/to/file1.ts" });
    (extractDescriptionsWithoutId as jest.Mock).mockReturnValue([["", "Test Case 1"]]);
    (addCase as jest.Mock).mockRejectedValue(new Error("Failed to add test case"));

    await addTestCasesService();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to add 'Test Case 1' to TestRail", expect.any(Error));
    expect(consoleLogSpy).toHaveBeenCalledWith("1 test cases failed to add to TestRail");
  });

  it("should skip updating files if no test cases were added", async () => {
    (getFilePaths as jest.Mock).mockResolvedValue({ "file1.ts": "path/to/file1.ts" });
    (extractDescriptionsWithoutId as jest.Mock).mockReturnValue([["", "Test Case 1"]]);
    (addCase as jest.Mock).mockResolvedValue(null);

    await addTestCasesService();

    expect(writeFile).not.toHaveBeenCalled();
  });
});
