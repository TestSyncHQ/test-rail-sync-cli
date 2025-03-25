import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { ENV } from "../config/env.config";
import { getInput } from "./console.utils";

const { rootPath, scan } = ENV;
const { excludedFolders, rootDirectory, testFileExtensions, testFilePath } = scan;

function isTestFile(filePath = testFilePath): boolean {
  if (!testFileExtensions) {
    throw new Error("File extensions not provided. Set TRSC_SCAN_FILE_PATH in .env");
  }

  return !!testFileExtensions?.some((testFileExtension) => filePath.toLowerCase().includes(testFileExtension));
}

async function fromConsole(): Promise<string[]> {
  // const options = await promptTestCaseOptions();
  // const filePath = await getFilePath("Enter the test cases file path: ");
  // return [[filePath], options];
  const filePath = await getInput("Enter the test cases file path: ");
  const fullPath = path.resolve(rootPath, filePath);
  return [fullPath];
}

function fromFile(): string[] {
  // const { scan, testCase } = ENV;
  // return [[scan.testFilePath], testCase];
  return [ENV.scan.testFilePath];
}

function fromGit(): string[] {
  // Run git status --porcelain to get untracked and modified files
  const gitOutput: string = execSync("git status --porcelain", { encoding: "utf8" });

  // Split the output by line and process each file
  return gitOutput
    .split("\n")
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0)
    .map((line: string) => line.slice(3).trim()) // Extract file path from status output
    .filter((filePath: string) => {
      if (!excludedFolders?.length || !isTestFile(filePath)) {
        return false;
      }

      // Normalize path for consistent comparison
      const normalizedFilePath = path.normalize(filePath);

      // TODO: Move to utils?
      // Check if the file is in an excluded folder
      const isInExcludedFolder = excludedFolders?.some((excludedFolder) => {
        const normalizedExcludedFolder = path.normalize(excludedFolder);
        // Check if file path starts with the excluded folder path
        return normalizedFilePath.startsWith(normalizedExcludedFolder + path.sep);
      });

      return !isInExcludedFolder;
    });
}

function fromRoot(): string[] {
  const filesPaths: string[] = [];

  const walk = (dir: string) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (excludedFolders && !excludedFolders.includes(file)) {
          walk(fullPath);
        }
      } else if (isTestFile(fullPath)) {
        filesPaths.push(fullPath);
      }
    });
  };

  walk(rootDirectory);

  return filesPaths;
}

export async function getFilePaths(source = ENV.scan.source): Promise<string[]> {
  switch (source) {
    case "console":
      return await fromConsole();
    case "file":
      return fromFile();
    case "git":
      return fromGit();
    case "root":
      return await fromRoot();
    // case "pipeline":
    //   return getPipelineFiles();
    default:
      throw new Error("Invalid source");
  }
}
