import { addCase } from "../api/test-rail.api";
import { ENV } from "../config/env.config";
import { ANSIColor } from "../definitions/console.definitions";
import type { TestCase } from "../definitions/test-case.definitions";
import { promptTestCaseOptions } from "../utils/console.utils";
import { getFilePaths } from "../utils/file-paths.utils";
import { parseDescriptions, readFileContent } from "../utils/file-reader.utils";
import { updateFileContent } from "../utils/file-writer.utils";

async function addTestCases(descriptions: string[][], options: TestCase): Promise<TestCase[]> {
  const testCases = [];

  for (const [, title] of descriptions) {
    try {
      const testCase = await addCase({ ...options, title });
      console.log(`'${testCase.id}: ${testCase.title}' added to TestRail`);
      testCases.push(testCase);
    } catch (error) {
      console.error(`Failed to add '${title}' to TestRail`, error);
    }
  }

  return testCases;
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
      const fileContent = readFileContent(filePath) || "";
      const descriptions = parseDescriptions(filePath).filter(([id]) => !id);
      const testCases = await addTestCases(descriptions, options);

      if (testCases.length) {
        updateFileContent(filePath, fileContent, testCases);
        console.log(`${filePath} file updated\n`);
      }

      success = testCases.length + success;
      fail = descriptions.length - testCases.length + fail;
    } catch (error) {
      console.error(`Failed to process file ${filePath}`, error);
    }
  }

  console.log(ANSIColor.Green, `${success} test cases added to TestRail`);
  console.log(ANSIColor.Red, `${fail} test cases failed to add to TestRail`);
}
