import { print } from "kolmafia";
import { AscensionTasks, DailyTasks, printTaskList } from "./tasks/tasks";

export function main(): void {
  print("Daily Tasks:");
  printTaskList(DailyTasks);

  print("Ascension Tasks:");
  printTaskList(AscensionTasks);
}
