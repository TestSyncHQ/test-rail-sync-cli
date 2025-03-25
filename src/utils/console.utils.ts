import { ENV } from "../config/env.config";
import { RL } from "../definitions/console.definitions";
import type { TestCase } from "../definitions/test-case.definitions";

export function getInput(prompt: string): Promise<string> {
  return new Promise((resolve) => RL.question(prompt, (input) => resolve(input)));
}

export async function promptTestCaseOptions(): Promise<TestCase> {
  const { testCase } = ENV;

  const {
    section_id,
    template,
    type_id,
    priority_id,
    refs,
    custom_manual_vs_automated,
    custom_automation_tool_type,
    custom_test_level,
  } = testCase;

  const useDefaults = await getInput("Do you want to use the values on your .env file (Y/n)?");

  if (useDefaults.toUpperCase() === "Y") {
    console.log("Using your .env file defaults...");
    return testCase;
  }

  testCase.section_id = (await getInput(`Enter Section ID: ${section_id}`)) || section_id;

  testCase.template = parseInt(await getInput(`Enter Template: ${template}`)) || template;

  testCase.type_id = parseInt(await getInput(`Enter Type ID: ${type_id}`)) || type_id;

  testCase.priority_id = parseInt(await getInput(`Enter Priority: ${priority_id}`)) || priority_id;

  testCase.refs = (await getInput(`Enter References: ${refs}`)) || refs;

  testCase.custom_manual_vs_automated =
    parseInt(await getInput(`Enter Manual vs Automated: ${custom_manual_vs_automated}`)) || custom_manual_vs_automated;

  testCase.custom_automation_tool_type =
    parseInt(await getInput(`Enter Automation Tool Type: ${custom_automation_tool_type}`)) || custom_automation_tool_type;

  testCase.custom_test_level = parseInt(await getInput(`Enter Test Level: ${custom_test_level}`)) || custom_test_level;

  return testCase;
}
