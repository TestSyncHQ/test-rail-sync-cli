import MockAdapter from "axios-mock-adapter";
import { ENV } from "../../config/env.config";
import type { Suite } from "../../definitions/suite.definitions";
import type { TestCase } from "../../definitions/test-case.definitions";
import { addCase, deleteCase, getCase, getCases, getSuites, updateCase, testRailInstance } from "../test-rail.api";

const mockAxios = new MockAdapter(testRailInstance);

jest.mock("../../config/env.config", () => ({
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
}));

describe("TestRail API Functions", () => {
  const mockTestCase: TestCase = {
    id: "1",
    title: "Sample Test Case",
    section_id: ENV.testCase.section_id,
  };

  const mockSuite: Suite = {
    id: "1",
    name: "Sample Suite",
  };

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should add a test case", async () => {
    mockAxios.onPost(`add_case/${mockTestCase.section_id}`).reply(200, mockTestCase);

    const result = await addCase(mockTestCase);
    expect(result).toEqual(mockTestCase);
  });

  it("should delete a test case", async () => {
    mockAxios.onPost(`delete_case/${mockTestCase.id}`).reply(200, mockTestCase);

    const result = await deleteCase(mockTestCase.id);
    expect(result).toEqual(mockTestCase);
  });

  it("should get a test case", async () => {
    mockAxios.onGet(`get_test/${mockTestCase.id}`).reply(200, mockTestCase);

    const result = await getCase(mockTestCase.id);
    expect(result).toEqual(mockTestCase);
  });

  it("should get all test cases", async () => {
    const mockTestCases = { cases: [mockTestCase] };
    mockAxios
      .onGet(`get_cases/${ENV.api.projectId}&suite_id=${ENV.api.suiteId}&section_id=${ENV.testCase.section_id}`)
      .reply(200, mockTestCases);

    const result = await getCases();
    expect(result).toEqual(mockTestCases.cases);
  });

  it("should get all suites", async () => {
    const mockSuites = [mockSuite];
    mockAxios.onGet(`get_suites/${ENV.api.projectId}`).reply(200, mockSuites);

    const result = await getSuites();
    expect(result).toEqual(mockSuites);
  });

  it("should update a test case", async () => {
    const updatedTestCase = { ...mockTestCase, title: "Updated Test Case" };
    mockAxios.onPost(`update_case/${updatedTestCase.id}`).reply(200, updatedTestCase);

    const result = await updateCase(updatedTestCase);
    expect(result).toEqual(updatedTestCase);
  });
});
