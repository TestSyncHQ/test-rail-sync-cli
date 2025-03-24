# Test Rail Sync CLI

A command-line interface for integrating unit tests with TestRail

## Features

1. Get test case
2. Get suites
3. Get test cases
4. Add test cases
5. Update test cases
6. Save test cases (add and update)

## Installation REPLACE with NPM

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd testrail-cli
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Start the project locally:

   ```bash
   npm run start
   ```

## Configuration

Create a `.env` file in the root directory with the following variables (you can use `.env_default` as a template):

```
TRSC_API_USERNAME=your-testrail-username
TRSC_API_KEY=your-testrail-api-key
TRSC_API_ORGANIZATION_URL=your-testrail-organization-url
TRSC_API_PROJECT_ID=your-project-id
TRSC_API_SUITE_ID=your-suite-id

# Test case configuration
TRSC_TEST_CASE_SECTION_ID=your-section-id
TRSC_TEST_CASE_TEMPLATE=1
TRSC_TEST_CASE_TYPE_ID=7
TRSC_TEST_CASE_PRIORITY_ID=1
TRSC_TEST_CASE_REFS=
TRSC_TEST_CASE_MILESTONE=
TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED=3
TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED=4
TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE=1
TRSC_TEST_CASE_CUSTOM_TEST_LEVEL=1
```

### Required Environment Variables

| Variable                                     | Description                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| `TRSC_API_USERNAME`                          | Your TestRail username (email)                                          |
| `TRSC_API_KEY`                               | Your TestRail API key                                                   |
| `TRSC_API_ORGANIZATION_URL`                  | Your TestRail organization URL                                          |
| `TRSC_API_PROJECT_ID`                        | The ID of your TestRail project                                         |
| `TRSC_API_SUITE_ID`                          | The ID of your TestRail test suite                                      |
| `TRSC_SCAN_SOURCE`                           | The source of the test files (e.g., Git, local filesystem, etc.)        |
| `TRSC_SCAN_TEST_FILE_PATH`                   | The specific path or pattern of the test file(s) to scan                |
| `TRSC_SCAN_ROOT_DIRECTORY`                   | The root directory where the scan for test files will begin             |
| `TRSC_SCAN_TEST_FILE_EXTENSIONS`             | Allowed file extensions for scanning (e.g., `.spec.ts,.test.ts`)        |
| `TRSC_SCAN_EXCLUDED_FOLDERS`                 | Comma-separated list of folder names to exclude from the scan           |
| `TRSC_TEST_CASE_SECTION_ID`                  | The section ID where test cases will be added                           |
| `TRSC_TEST_CASE_TEMPLATE`                    | The ID of the template used when creating a new test case               |
| `TRSC_TEST_CASE_TYPE_ID`                     | The ID of the test case type in TestRail (e.g., Functional, Regression) |
| `TRSC_TEST_CASE_PRIORITY_ID`                 | The ID of the test case priority in TestRail (e.g., High, Medium)       |
| `TRSC_TEST_CASE_REFS`                        | References linked to the test case (e.g., JIRA ticket IDs)              |
| `TRSC_TEST_CASE_MILESTONE`                   | The milestone associated with the test case                             |
| `TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED`  | Field to specify if the test case is manual or automated                |
| `TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED`     | Custom field for further detail on manual or automated classification   |
| `TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE` | The automation tool used (e.g., Cypress, Playwright)                    |
| `TRSC_TEST_CASE_CUSTOM_TEST_LEVEL`           | The test level (e.g., Unit, Integration, E2E)                           |

### Test Case Configuration Options

The following tables list all possible values for the test case configuration environment variables.

#### TRSC_TEST_CASE_TEMPLATE

| Value | Description         |
| ----- | ------------------- |
| 0     | Exploratory Charter |
| 1     | Test Case           |
| 2     | UniTest / WebIR     |

#### TRSC_TEST_CASE_TYPE_ID

| Value | Description      |
| ----- | ---------------- |
| 0     | API Postman      |
| 1     | API Unit Test    |
| 2     | Autify ETE Test  |
| 3     | Automated        |
| 4     | Client Unit Test |
| 5     | Database Test    |
| 6     | DBT Test         |
| 7     | E2E Test         |
| 8     | Exploratory      |
| 9     | Functionality    |
| 10    | Glue Unit Test   |
| 11    | Integration Test |
| 12    | Manual           |
| 13    | Other            |
| 14    | Sanity Test      |
| 15    | Smoke Test       |
| 16    | Unit Test        |

#### TRSC_TEST_CASE_PRIORITY_ID

| Value | Description      |
| ----- | ---------------- |
| 0     | 1 - Don't Test   |
| 1     | 2 - Test If Time |
| 2     | 3 - MustTest     |

#### TRSC_TEST_CASE_CUSTOM_MANUAL_VS_AUTOMATED

| Value | Description |
| ----- | ----------- |
| 0     | None        |
| 1     | Manual      |
| 3     | Automated   |

#### TRSC_TEST_CASE_CUSTOM_MANUAL_AUTOMATED

| Value | Description                             |
| ----- | --------------------------------------- |
| 0     | None                                    |
| 1     | Manual                                  |
| 2     | Under ENG development (manually tested) |
| 3     | E2E ENG Automated Test                  |
| 4     | Unit Test                               |
| 5     | Autify Automated                        |
| 6     | Postman API Automated                   |
| 7     | Selenium Automated                      |
| 8     | Older Tests                             |
| 9     | Nightwatch Automated                    |
| 10    | Playwright Automated                    |
| 11    | Synthetic Test                          |
| 12    | Smoke Test                              |

#### TRSC_TEST_CASE_CUSTOM_AUTOMATION_TOOL_TYPE

| Value | Description |
| ----- | ----------- |
| 0     | None        |
| 1     | Jest        |
| 2     | Autify      |
| 3     | Nightwatch  |
| 4     | Cypress     |
| 5     | Selenium    |
| 6     | Mocha       |
| 7     | Playwright  |
| 8     | Postman     |
| 9     | Manual      |
| 10    | DataDog     |
| 11    | XUnit       |
| 12    | Q4DataLib   |
| 13    | Airflow     |

#### TRSC_TEST_CASE_CUSTOM_TEST_LEVEL

| Value | Description                 |
| ----- | --------------------------- |
| 0     | None                        |
| 1     | Unit test                   |
| 2     | Integration test            |
| 3     | Exploratory test            |
| 4     | Regression test             |
| 5     | Smoke test                  |
| 6     | Sanity Post-deployment test |
| 7     | Functionality test          |
| 8     | Smoke &amp; Regression Test |
| 9     | Sanity Test                 |

## License

ISC
