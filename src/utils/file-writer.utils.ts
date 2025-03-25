import * as fs from "fs";
import type { TestCase } from "../definitions/test-case.definitions";

export function updateFileContent(filePath: string, fileContent: string, testCases: TestCase[]): void {
  // export function updateFileContent(filePath: string, fileContent: string, testCases: { id: string; title: string }[]): void {
  // TODO: update descriptions with IDs
  const newContent = testCases.reduce(
    (accumulator, testCase) =>
      (testCase?.id && testCase?.title && accumulator.replace(testCase?.title, `${testCase.id}: ${testCase.title}`)) || "",
    fileContent,
  );

  fs.writeFileSync(filePath, newContent, "utf8");
}
