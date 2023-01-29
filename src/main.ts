import { print, userConfirm } from "kolmafia";
import { ascend } from "./ascend";
import { AscensionTasks, DailyTasks, printTaskList } from "./tasks/tasks";

export function main(): void {
  print("Daily Tasks:");
  printTaskList(DailyTasks);

  print("Ascension Tasks:");
  printTaskList(AscensionTasks);

  if (!userConfirm("Does this look alright?"))
  {
    print("User aborted");
    return;
  }

  try {
    ascend();
  }
  catch (e) {
    if (e instanceof Error) {
      print("Error caught, aborting:");
      print(e.message);
    }
  }
};
