import * as fs from "fs";

export function parseDescriptions(fileContent: string): string[][] {
  const regex = /(?:test|it)\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;
  const descriptions = [];
  let match;

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    descriptions.push([id, title]);
  }

  return descriptions;
}

export function readFileContent(filePath: string): string {
  return fs.readFileSync(filePath, "utf-8");
}
