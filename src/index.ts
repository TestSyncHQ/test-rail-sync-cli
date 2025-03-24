import "dotenv/config";
import { addTestCasesCommand } from "./commands/add-test-cases.command";
import { RL } from "./definitions/console.definitions";
import { getInput } from "./utils/console.utils";

(async function main() {
  console.log("\nTEST RAIL CLI\n");
  console.log("1. Get test case");
  console.log("2. Get suites");
  console.log("3. Get test cases");
  console.log("4. Add test cases");
  console.log("5. Update test cases");
  console.log("6. Save test cases (add and update)");
  console.log("9. Exit");

  const operation = await getInput("\nEnter the number corresponding to your choice: ");

  switch (operation.trim()) {
    // case "1":
    //   await getTestCaseCommand();
    //   break;
    // case "2":
    //   await getSuitesCommand();
    //   break;
    // case "3":
    //   await getTestCasesCommand();
    //   break;
    case "4":
      await addTestCasesCommand();
      break;
    // case "5":
    //   await updateTestCasesCommand();
    //   break;
    // case "7":
    //   await saveTestCasesCommand();
    //   break;
    case "9":
      RL.close();
      break;
    default:
      break;
  }

  main();
})();
