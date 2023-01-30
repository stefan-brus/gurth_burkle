import { myAdventures, print, userConfirm } from "kolmafia";
import { Constants } from "./Constants";
import { Subtask, Task } from "./tasks/Task";
import { AscensionTasks, DailyTasks, IdleTask } from "./tasks/Tasks";

export function ascend() {
  print("Starting main ascension loop");

  let currentTask = IdleTask;
  let currentSubtask = currentTask.subtasks[0];

  while (!isDayOver()) {
    const newTask = chooseTask();
    if (newTask !== currentTask) {
      currentTask = newTask;

      if (!userConfirm("Start task " + currentTask.name + "?")) {
        throw new Error("User aborted on task " + currentTask.name);
      }

      print("Completing task " + currentTask.name);
    }

    const newSubtask = chooseSubtask(currentTask);
    if (newSubtask !== currentSubtask) {
      currentSubtask = newSubtask;
      print("Completing subtask "+ currentSubtask.name);
    }

    const progress = currentSubtask.progress();
    if (progress !== undefined) {
      print(`Adventure location: ${progress.location}, modifiers: ${progress.modifiers}`);
    }
  }

  print("Done for the day");
}

function isDayOver(): boolean {
  return myAdventures() <= Constants.ReservedAdventures;
}

function chooseTask(): Task {
  const dailyTask = DailyTasks.find(hasAvailableIncompleteSubtask);
  if (dailyTask !== undefined) {
    return dailyTask;
  }

  const ascensionTask = AscensionTasks.find(hasAvailableIncompleteSubtask);
  if (ascensionTask !== undefined) {
    return ascensionTask;
  }

  throw new Error("No task available");
}

function chooseSubtask(task: Task): Subtask {
  const subTask = task.subtasks.find(isAvailableIncompleteSubtask);
  if (subTask !== undefined) {
    return subTask;
  }

  throw new Error("No subtask available");
}

function hasAvailableIncompleteSubtask(task: Task): boolean {
  return task.subtasks.findIndex(isAvailableIncompleteSubtask) !== -1;
}

function isAvailableIncompleteSubtask(subtask: Subtask): boolean {
  return subtask.available() && !subtask.completed();
}
