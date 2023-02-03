import { getProperty, print, setProperty, userConfirm } from "kolmafia";
import { ascend } from "./Ascend";
import { Properties } from "./Properties";
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
  resetProperties(Properties);
}

function resetProperties(props: object) {
  for (const [k, v] of Object.entries(props)) {
    if (typeof(v) === 'string') {
      setProperty(v, "");
    }
    else if (typeof(v) === 'object') {
      resetProperties(v);
    }
    else {
      throw new Error(`Cannot reset ${v} with type ${typeof(v)}`);
    }
  }
}
