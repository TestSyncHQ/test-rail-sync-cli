import { ENV } from "../../config/env.config";
import { RL } from "../../definitions/console.definitions";
import type { TestCase } from "../../definitions/test-case.definitions";
import { promptTestCaseOptions, getInput } from "../console.utils";

jest
  .mock("../../config/env.config", () => ({
    ENV: {
      api: {
        organizationUrl: "https://mock-testrail.com",
        username: "mockUser",
        password: "mockPass",
        projectId: 123,
        suiteId: 456,
      },
      testCase: {
        section_id: 789,
      },
    },
  }))
  .mock("../../definitions/console.definitions", () => ({
    RL: {
      question: jest.fn(),
    },
  }));

describe("getInput", () => {
  it("should resolve with the user input", async () => {
    const prompt = "Enter your name:";
    const input = "John Doe";

    (RL.question as jest.Mock).mockImplementationOnce((_prompt, callback) => callback(input));

    const result = await getInput(prompt);

    expect(result).toBe(input);
    expect(RL.question).toHaveBeenCalledWith(prompt, expect.any(Function));
  });
});

describe("promptTestCaseOptions", () => {
  const mockTestCase: TestCase = {
    section_id: "1",
    template: 1,
    type_id: 2,
    priority_id: 3,
    refs: "REF-123",
    custom_manual_vs_automated: 1,
    custom_automation_tool_type: 1,
    custom_test_level: 1,
  };

  beforeEach(() => {
    ENV.testCase = { ...mockTestCase }; // Reset ENV.testCase before each test
  });

  it("should use default values from .env when user enters 'Y'", async () => {
    (RL.question as jest.Mock).mockImplementationOnce((_prompt, callback) => callback("Y"));

    const result = await promptTestCaseOptions();

    expect(result).toEqual(mockTestCase);
    expect(RL.question).toHaveBeenCalledTimes(1);
  });

  it("should prompt for and update values when user enters 'n'", async () => {
    (RL.question as jest.Mock)
      .mockImplementationOnce((_prompt, callback) => callback("n"))
      .mockImplementationOnce((_prompt, callback) => callback("2"))
      .mockImplementationOnce((_prompt, callback) => callback("2"))
      .mockImplementationOnce((_prompt, callback) => callback("4"))
      .mockImplementationOnce((_prompt, callback) => callback("4"))
      .mockImplementationOnce((_prompt, callback) => callback("REF-456"))
      .mockImplementationOnce((_prompt, callback) => callback("2"))
      .mockImplementationOnce((_prompt, callback) => callback("2"))
      .mockImplementationOnce((_prompt, callback) => callback("2"));

    const expectedResult: TestCase = {
      section_id: "2",
      template: 2,
      type_id: 4,
      priority_id: 4,
      refs: "REF-456",
      custom_manual_vs_automated: 2,
      custom_automation_tool_type: 2,
      custom_test_level: 2,
    };

    const result = await promptTestCaseOptions();

    expect(result).toEqual(expectedResult);
    expect(RL.question).toHaveBeenCalledTimes(9);
  });

  it("should use default values when user enters empty string for a prompt", async () => {
    (RL.question as jest.Mock)
      .mockImplementationOnce((_prompt, callback) => callback("n"))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""));

    const result = await promptTestCaseOptions();

    expect(result).toEqual(mockTestCase);
    expect(RL.question).toHaveBeenCalledTimes(9);
  });

  it("should handle mixed inputs (some defaults, some new)", async () => {
    (RL.question as jest.Mock)
      .mockImplementationOnce((_prompt, callback) => callback("n"))
      .mockImplementationOnce((_prompt, callback) => callback("2"))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback("4"))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback("REF-123"))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback(""))
      .mockImplementationOnce((_prompt, callback) => callback("1"));

    const expectedResult: TestCase = {
      section_id: "2",
      template: 1,
      type_id: 4,
      priority_id: 3,
      refs: "REF-123",
      custom_manual_vs_automated: 1,
      custom_automation_tool_type: 1,
      custom_test_level: 1,
    };

    const result = await promptTestCaseOptions();

    expect(result).toEqual(expectedResult);
    expect(RL.question).toHaveBeenCalledTimes(9);
  });
});
