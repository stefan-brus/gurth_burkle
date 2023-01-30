import { getProperty, print, userConfirm } from "kolmafia";
import { ascend } from "./Ascend";
import { AscensionTasks, DailyTasks, printTaskList } from "./tasks/Tasks";

export function main() {
  print("Daily Tasks:");
  printTaskList(DailyTasks);

  print("Ascension Tasks:");
  printTaskList(AscensionTasks);

  if (!userConfirm("Does this look alright?"))
  {
    print("User aborted");
    return;
  }

  if (isAscensionStart()) {
    resetMyProperties();
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

function isAscensionStart(): boolean {
  return getProperty("questM05Toot") === "started";
}

function resetMyProperties() {

}
