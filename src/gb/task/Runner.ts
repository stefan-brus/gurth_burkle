import { council } from "kolmafia";
import { runActions } from "../action/Runner";
import { Logger } from "../log/Logger";
import { Task } from "./Task";

export function runTask(task: Task) {
  Logger.info(`Running task: ${task.name}`);

  if (task.completed()) {
    Logger.warn(`Task ${task.name} is already completed, which is likely a logic error`);
    return;
  }

  if (task.requires) {
    task.requires.forEach(required => {
      if (!required.completed()) {
        Logger.info(`Requirement ${required.name} for ${task.name} not completed`);
        runTask(required);
      }
    });
  }

  runActions(task.actions());

  if (!task.completed()) {
    Logger.error(`Unable to complete ${task.name}`);
    throw new Error("Error running task");
  }

  if (task.council === true) {
    Logger.info(`Visiting council`);
    council();
  }
}
