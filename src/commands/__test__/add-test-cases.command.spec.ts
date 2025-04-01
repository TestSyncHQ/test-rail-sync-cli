import { addTestCasesService } from "../../services/add-test-cases.service";
import { addTestCasesCommand } from "../add-test-cases.command";

jest.mock("../../services/add-test-cases.service", () => ({
  addTestCasesService: jest.fn(),
}));

describe("addTestCasesCommand", () => {
  it("should call addTestCasesService", async () => {
    await addTestCasesCommand();

    expect(addTestCasesService).toHaveBeenCalledTimes(1);
  });

  it("should handle errors thrown by addTestCasesService", async () => {
    (addTestCasesService as jest.Mock).mockRejectedValue(new Error("Service error"));

    await expect(addTestCasesCommand()).rejects.toThrow("Service error");

    expect(addTestCasesService).toHaveBeenCalledTimes(1);
  });
});
