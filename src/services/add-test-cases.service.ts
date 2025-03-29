import { addCase } from "../api/test-rail.api";
import { ENV } from "../config/env.config";
import type { TestCase, TestCaseDescriptions } from "../definitions/test-case.definitions";
import { promptTestCaseOptions } from "../utils/console.utils";
import { getFilePaths, readFile, writeFile } from "../utils/file.utils";
import { extractDescriptionsWithoutId, replaceDescriptions } from "../utils/test-case.utils";

async function addTestCases(descriptions: TestCaseDescriptions, options: TestCase): Promise<TestCase[]> {
  const testCases = [];

  for (const [, title] of descriptions) {
    try {
      const testCase = await addCase({ ...options, title });
      if (!testCase) continue;

      testCases.push(testCase);
      console.log(`'${testCase.id}: ${testCase.title}' added to TestRail`);
    } catch (error) {
      console.error(`Failed to add '${title}' to TestRail`, error);
    }
  }

  return testCases;
}

function updateFileContent(filePath: string, fileContent: string, testCases: TestCase[]): void {
  if (!testCases.length) return;

  const newFileContent = replaceDescriptions(fileContent, testCases);
  writeFile(filePath, newFileContent);
  console.log(`${filePath} file updated\n`);
}

export async function addTestCasesService(): Promise<void> {
  console.log("\nAdding test cases...\n");
  const options = ENV.scan.source === "console" ? await promptTestCaseOptions() : ENV.testCase;
  const filesPaths = await getFilePaths();

  let success = 0;
  let fail = 0;

  for (const filePath in filesPaths) {
    console.log(`Processing file ${filePath}...`);

    try {
      const fileContent = readFile(filePath) || "";
      const descriptions = extractDescriptionsWithoutId(fileContent);
      const testCases = await addTestCases(descriptions, options);
      updateFileContent(filePath, fileContent, testCases);

      success = testCases.length + success;
      fail = descriptions.length - testCases.length + fail;
    } catch (error) {
      console.error(`Failed to process file ${filePath}`, error);
    }
  }

  console.log(`${success} test cases added to TestRail`);
  console.log(`${fail} test cases failed to add to TestRail`);
}
