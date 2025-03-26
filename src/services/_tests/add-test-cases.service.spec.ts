import { addCase } from "../../api/test-rail.api";
import { ANSIColor } from "../../definitions/console.definitions";
import { getFilePaths } from "../../utils/file-paths.utils";
import { parseDescriptions, readFileContent } from "../../utils/file-reader.utils";
import { updateFileContent } from "../../utils/file-writer.utils";
import { addTestCasesService } from "../add-test-cases.service";

jest.mock("../../api/test-rail.api", () => ({
  addCase: jest.fn(),
}));

jest.mock("../../config/env.config", () => ({
  ENV: {
    scan: { source: "console" },
    testCase: { section_id: 789 },
  },
}));

jest.mock("../../utils/console.utils", () => ({
  promptTestCaseOptions: jest.fn(),
}));

jest.mock("../../utils/file-paths.utils", () => ({
  getFilePaths: jest.fn(),
}));

jest.mock("../../utils/file-reader.utils", () => ({
  parseDescriptions: jest.fn(),
  readFileContent: jest.fn(),
}));

jest.mock("../../utils/file-writer.utils", () => ({
  updateFileContent: jest.fn(),
}));

describe("addTestCasesService", () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
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

    const mockDescriptions = [["", "Test Case 1"]];
    (parseDescriptions as jest.Mock).mockReturnValue(mockDescriptions);

    (readFileContent as jest.Mock).mockReturnValue("file content");

    const mockTestCase = { id: 1, title: "Test Case 1", section_id: 789 };
    (addCase as jest.Mock).mockResolvedValue(mockTestCase);

    await addTestCasesService();

    expect(getFilePaths).toHaveBeenCalled();
    expect(parseDescriptions).toHaveBeenCalledWith("file1.ts");
    expect(addCase).toHaveBeenCalledWith({ section_id: 789, title: "Test Case 1" });
    expect(updateFileContent).toHaveBeenCalledWith("file1.ts", "file content", [mockTestCase]);
    expect(consoleLogSpy).toHaveBeenCalledWith(ANSIColor.Green, "1 test cases added to TestRail");
  });

  it("should handle errors when adding test cases", async () => {
    (getFilePaths as jest.Mock).mockResolvedValue({ "file1.ts": "path/to/file1.ts" });
    (parseDescriptions as jest.Mock).mockReturnValue([["", "Test Case 1"]]);
    (addCase as jest.Mock).mockRejectedValue(new Error("Failed to add test case"));

    await addTestCasesService();

    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to add 'Test Case 1' to TestRail", expect.any(Error));

    expect(consoleLogSpy).toHaveBeenCalledWith(ANSIColor.Red, "1 test cases failed to add to TestRail");
  });

  it("should skip updating files if no test cases were added", async () => {
    (getFilePaths as jest.Mock).mockResolvedValue({ "file1.ts": "path/to/file1.ts" });
    (parseDescriptions as jest.Mock).mockReturnValue([["", "Test Case 1"]]);
    (addCase as jest.Mock).mockResolvedValue(null);

    await addTestCasesService();

    expect(updateFileContent).not.toHaveBeenCalled();
  });
});
