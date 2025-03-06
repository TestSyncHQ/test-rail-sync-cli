export const CASE_TEMPLATE = {
  "Exploratory Charter": 0,
  "Test Case": 1,
  "UniTest / WebIR": 2,
};

export const CASE_TYPE = {
  "API Unit Test": 1,
  "API Postman": 0,
  "Autify ETE Test": 2,
  "Automated": 3,
  "Client Unit Test": 4,
  "Database Test": 5,
  "DBT Test": 6,
  "E2E Test": 7,
  "Exploratory": 8,
  "Functionality": 9,
  "Glue Unit Test": 10,
  "Integration Test": 11,
  "Manual": 12,
  "Other": 13,
  "Sanity Test": 14,
  "Smoke Test": 15,
  "Unit Test": 16,
};

export const CASE_PRIORITY = {
  "1 - Don't Test": 0,
  "2 - Test If Time": 1,
  "3 - MustTest": 2,
};

export const CASE_MANUAL_VS_AUTOMATED = {
  None: 0,
  Manual: 1,
  Automated: 3,
};

export const CASE_TYPE_AUTOMATION = {
  "None": 0,
  "Manual": 1,
  "Under ENG development (manually tested)": 2,
  "E2E ENG Automated Test": 3,
  "Unit Test": 4,
  "Autify Automated": 5,
  "Postman API Automated": 6,
  "Selenium Automated": 7,
  "Older Tests": 8,
  "Nightwatch Automated": 9,
  "Playwright Automated": 10,
  "Synthetic Test": 11,
  "Smoke Test": 12,
};

export const CASE_AUTOMATION_TOOL_TYPE = {
  None: 0,
  Jest: 1,
  Autify: 2,
  Nightwatch: 3,
  Cypress: 4,
  Selenium: 5,
  Mocha: 6,
  Playwright: 7,
  Postman: 8,
  Manual: 9,
  DataDog: 10,
  XUnit: 11,
  Q4DataLib: 12,
  Airflow: 13,
};

export const CASE_TEST_LEVEL = {
  "None": 0,
  "Unit test": 1,
  "Integration test": 2,
  "Exploratory test": 3,
  "Regression test": 4,
  "Smoke test": 5,
  "Sanity Post-deployment test": 6,
  "Functionality test": 7,
  "Smoke &amp; Regression Test": 8,
  "Sanity Test": 9,
};

export const CASE_STATUS_ID = {
  "Mark As Deleted": 3,
};

export type Case = {
  section_id?: string;
  id?: string;
  title?: string;
  template?: typeof CASE_TEMPLATE;
  type_id?: typeof CASE_TYPE;
  priority_id?: typeof CASE_PRIORITY;
  refs?: string;
  custom_manual_vs_automated?: typeof CASE_MANUAL_VS_AUTOMATED;
  custom_manual_automated?: typeof CASE_TYPE_AUTOMATION;
  custom_automation_tool_type?: typeof CASE_AUTOMATION_TOOL_TYPE;
  custom_test_level?: typeof CASE_TEST_LEVEL;
  custom_status_id?: typeof CASE_STATUS_ID;
};
