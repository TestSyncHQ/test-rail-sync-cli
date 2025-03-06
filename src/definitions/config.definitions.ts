import {
  CASE_AUTOMATION_TOOL_TYPE,
  CASE_MANUAL_VS_AUTOMATED,
  CASE_PRIORITY,
  CASE_TEMPLATE,
  CASE_TEST_LEVEL,
  CASE_TYPE,
  CASE_TYPE_AUTOMATION,
} from "./case.definitions";

// Process environment variables can be passed through the command line or the pipeline
export const CONFIG = {
  api: {
    username: process.env.TRSC_API_USERNAME || "",
    password: process.env.TRSC_API_KEY || "",
    organizationUrl: process.env.TRSC_API_ORGANIZATION_URL,
    projectId: process.env.TRSC_API_PROJECT_ID,
    suiteId: process.env.TRSC_API_SUITE_ID,
  },
  fileExtensions: process.env.TRSC_FILE_EXTENSIONS || [".test", ".spec"],
  testCase: {
    section_id: process.env.TRSC_CASE_SECTION_ID,
    template: process.env.TRSC_CASE_TEMPLATE ? parseInt(process.env.TRSC_CASE_TEMPLATE) : CASE_TEMPLATE["Test Case"],
    type_id: process.env.TRSC_CASE_TYPE_ID ? parseInt(process.env.TRSC_CASE_TYPE_ID) : CASE_TYPE["Unit Test"],
    priority_id: process.env.TRSC_CASE_PRIORITY_ID
      ? parseInt(process.env.TRSC_CASE_PRIORITY_ID)
      : CASE_PRIORITY["3 - MustTest"],
    refs: process.env.TRSC_CASE_REFS || "",
    milestione: process.env.TRSC_CASE_MILESTONE || "",
    custom_manual_vs_automated: process.env.TRSC_CASE_CUSTOM_MANUAL_VS_AUTOMATED
      ? parseInt(process.env.TRSC_CASE_CUSTOM_MANUAL_VS_AUTOMATED)
      : CASE_MANUAL_VS_AUTOMATED.Automated,
    custom_manual_automated: process.env.TRSC_CASE_CUSTOM_MANUAL_AUTOMATED
      ? parseInt(process.env.TRSC_CASE_CUSTOM_MANUAL_AUTOMATED)
      : CASE_TYPE_AUTOMATION["Unit Test"],
    custom_automation_tool_type: process.env.TRSC_CASE_CUSTOM_AUTOMATION_TOOL_TYPE
      ? parseInt(process.env.TRSC_CASE_CUSTOM_AUTOMATION_TOOL_TYPE)
      : CASE_AUTOMATION_TOOL_TYPE.Jest,
    custom_test_level: process.env.TRSC_CASE_CUSTOM_TEST_LEVEL
      ? parseInt(process.env.TRSC_CASE_CUSTOM_TEST_LEVEL)
      : CASE_TEST_LEVEL["Unit test"],
  },
};
