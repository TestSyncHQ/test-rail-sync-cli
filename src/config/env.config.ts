import * as dotenv from "dotenv";
import type { Config, Scan } from "../definitions/config.definitions";
import {
  TEST_CASE_TEMPLATE,
  TEST_CASE_TYPE,
  TEST_CASE_PRIORITY,
  TEST_CASE_MANUAL_VS_AUTOMATED,
  TEST_CASE_TYPE_AUTOMATION,
  TEST_CASE_AUTOMATION_TOOL_TYPE,
  TEST_CASE_TEST_LEVEL,
} from "../definitions/test-case.definitions";

dotenv.config();

const {
  TRSC_API_USERNAME,
  TRSC_API_KEY,
  TRSC_API_ORGANIZATION_URL,
  TRSC_API_PROJECT_ID,
  TRSC_API_SUITE_ID,
  TRSC_SCAN_SOURCE,
  TRSC_SCAN_TEST_FILE_PATH,
  TRSC_SCAN_ROOT_DIRECTORY,
  TRSC_SCAN_TEST_FILE_EXTENSIONS,
  TRSC_SCAN_EXCLUDED_FOLDERS,
  TRSC_TEST_CASE_SECTION_ID, // AKA group_id
  TRSC_TEST_CASE_TEMPLATE,
  TRSC_TEST_CASE_TYPE_ID,
  TRSC_TEST_CASE_PRIORITY_ID,
  TRSC_TEST_CASE_REFS,
  TRSC_TEST_CASE_MILESTONE,
  TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED,
  TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED,
  TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE,
  TRSC_TEST_CASE_CUSTOM_TEST_LEVEL,
} = process.env;

if (!TRSC_API_USERNAME || !TRSC_API_KEY || !TRSC_API_ORGANIZATION_URL || !TRSC_API_PROJECT_ID || !TRSC_API_SUITE_ID) {
  throw new Error("Missing TestRail API credentials");
}

export const ENV: Config = {
  api: {
    username: TRSC_API_USERNAME,
    password: TRSC_API_KEY,
    organizationUrl: TRSC_API_ORGANIZATION_URL,
    projectId: TRSC_API_PROJECT_ID,
    suiteId: TRSC_API_SUITE_ID,
  },
  rootPath: __dirname, // eslint-disable-line no-undef
  scan: {
    source: TRSC_SCAN_SOURCE ? (TRSC_SCAN_SOURCE as Scan["source"]) : "root",
    excludedFolders: TRSC_SCAN_EXCLUDED_FOLDERS ? TRSC_SCAN_EXCLUDED_FOLDERS?.split(",") : ["node_modules", "dist", "build"],
    testFileExtensions: TRSC_SCAN_TEST_FILE_EXTENSIONS ? TRSC_SCAN_TEST_FILE_EXTENSIONS?.split(",") : [".test", ".spec"],
    testFilePath: TRSC_SCAN_TEST_FILE_PATH || "",
    rootDirectory: TRSC_SCAN_ROOT_DIRECTORY || "src",
  },
  testCase: {
    section_id: TRSC_TEST_CASE_SECTION_ID || "",
    template: TRSC_TEST_CASE_TEMPLATE ? parseInt(TRSC_TEST_CASE_TEMPLATE) : TEST_CASE_TEMPLATE["Test Case"],
    type_id: TRSC_TEST_CASE_TYPE_ID ? parseInt(TRSC_TEST_CASE_TYPE_ID) : TEST_CASE_TYPE["Unit Test"],
    priority_id: TRSC_TEST_CASE_PRIORITY_ID ? parseInt(TRSC_TEST_CASE_PRIORITY_ID) : TEST_CASE_PRIORITY["3 - MustTest"],
    refs: TRSC_TEST_CASE_REFS || "",
    milestone: TRSC_TEST_CASE_MILESTONE || "",
    custom_manual_vs_automated: TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED
      ? parseInt(TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED)
      : TEST_CASE_MANUAL_VS_AUTOMATED.Automated,
    custom_manual_automated: TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED
      ? parseInt(TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED)
      : TEST_CASE_TYPE_AUTOMATION["Unit Test"],
    custom_automation_tool_type: TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE
      ? parseInt(TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE)
      : TEST_CASE_AUTOMATION_TOOL_TYPE.Jest,
    custom_test_level: TRSC_TEST_CASE_CUSTOM_TEST_LEVEL
      ? parseInt(TRSC_TEST_CASE_CUSTOM_TEST_LEVEL)
      : TEST_CASE_TEST_LEVEL["Unit test"],
  },
};
