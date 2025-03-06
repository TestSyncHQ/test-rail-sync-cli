import axios from "axios";
import type { Case } from "../../definitions/case.definitions";
import { CONFIG } from "../../definitions/config.definitions";

const { organizationUrl, username, password, projectId, suiteId } = CONFIG.api;

const axiosInstance = axios.create({
  baseURL: `${organizationUrl}/api/v2/`,
  auth: { username, password },
  headers: { "Content-Type": "application/json" },
  timeout: 5 * 1000,
});

export async function addCase(testCase: Case): Promise<Case> {
  const response = await axiosInstance.post(`add_case/${testCase.section_id}`, testCase);
  return response.data;
}

export async function getCase(id: Case["id"]): Promise<Case> {
  const response = await axiosInstance.get(`get_test/${id}`);
  return response.data;
}

export async function getCases(sectionId: Case["section_id"]): Promise<Case[]> {
  const response = await axiosInstance.get(`get_cases/${projectId}&suite_id=${suiteId}&section_id=${sectionId}`);
  return response.data.cases;
}
