import type { TestCase, TestCaseDescriptions } from "../definitions/test-case.definitions";

const regex = /(test|it)\s*\(\s*['"]\s*([0-9]*\s*:\s*)?(.*?)\s*['"]\s*,/g;

function formatId(id: string): string {
  return id.replace(":", "").trim();
}

function formatTitle(title: string): string {
  return title.trim();
}

function extractDescriptions(fileContent: string): TestCaseDescriptions {
  const results = [];
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[2] ? formatId(match[2]) : undefined;
    const title = formatTitle(match[3]);
    results.push([id, title]);
  }

  return results;
}

export function extractDescriptionsWithId(fileContent: string): TestCaseDescriptions {
  const descriptions = extractDescriptions(fileContent);
  return descriptions.filter(([id]) => !!id);
}

export function extractDescriptionsWithoutId(fileContent: string): TestCaseDescriptions {
  const descriptions = extractDescriptions(fileContent);
  return descriptions.filter(([id]) => !id);
}

export function extractAllDescriptions(fileContent: string): (undefined | string)[][] {
  return extractDescriptions(fileContent);
}

export function replaceDescriptions(fileContent: string, testCases: TestCase[]): string {
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[2];
    const title = match[3];

    if (id) {
      const testCase = testCases.find((testCase) => testCase.id === formatId(id));

      if (testCase?.title && testCase.title !== title) {
        fileContent = fileContent.replace(title, testCase.title);
      }
    } else {
      const formattedTitle = formatTitle(match[3]);
      const testCase = testCases.find((testCase) => testCase.title === formattedTitle);

      if (testCase?.id) {
        fileContent = fileContent.replace(formattedTitle, `${testCase.id}: ${testCase.title}`);
      }
    }
  }

  return fileContent;
}
