import { addTestCasesService } from "../services/add-test-cases.service";

export async function addTestCasesCommand(): Promise<void> {
  await addTestCasesService();
}
