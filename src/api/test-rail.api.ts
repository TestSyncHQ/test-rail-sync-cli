import axios from "axios";
import { ENV } from "../config/env.config";
import type { Suite } from "../definitions/suite.definitions";
import type { TestCase } from "../definitions/test-case.definitions";

const { organizationUrl, username, password, projectId, suiteId } = ENV.api;
const { section_id } = ENV.testCase;

export const testRailInstance = axios.create({
  baseURL: `${organizationUrl}/api/v2/`,
  auth: { username, password },
  headers: { "Content-Type": "application/json" },
});

export async function addCase(testCase: TestCase): Promise<TestCase> {
  const response = await testRailInstance.post(`add_case/${testCase.section_id}`, testCase);
  return response.data;
}

export async function deleteCase(id: TestCase["id"]): Promise<TestCase> {
  const response = await testRailInstance.post(`delete_case/${id}`);
  return response.data;
}

export async function getCase(id: TestCase["id"]): Promise<TestCase> {
  const response = await testRailInstance.get(`get_test/${id}`);
  return response.data;
}

export async function getCases(): Promise<TestCase[]> {
  const response = await testRailInstance.get(`get_cases/${projectId}&suite_id=${suiteId}&section_id=${section_id}`);
  return response.data.cases;
}

export async function getSuites(): Promise<Suite[]> {
  const response = await testRailInstance.get(`get_suites/${projectId}`);
  return response.data;
}

export async function updateCase(testCase: TestCase): Promise<TestCase> {
  const { id, ...data } = testCase;
  const response = await testRailInstance.post(`update_case/${id}`, data);
  return response.data;
}
