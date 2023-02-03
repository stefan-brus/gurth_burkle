import { print } from "kolmafia";
import { myMainstat } from "../lib/Utils";
import { UnlockFallbotLocationsTask } from "../shinies/Fallbot";
import { ConfigureTrainsetTask } from "../shinies/ModelTrainset";
import { AscensionStartTask, UnlockGuildTask } from "./ascension/AscensionStart";
import { L02Task } from "./ascension/L02SpookyForest";
import { CloversTask, IngredientsTask, MrKlawTask, OliverFightsTask, PvpFightsTask, RockGardenTask } from "./Daily";
import { Task } from "./Task";

export const AscensionTasks: Task[] = [
  AscensionStartTask,
  ConfigureTrainsetTask,
  UnlockFallbotLocationsTask,
  UnlockGuildTask,
  L02Task,
];

export const DailyTasks: Task[] = [
  CloversTask,
  IngredientsTask,
  PvpFightsTask,
  OliverFightsTask,
  RockGardenTask,
  MrKlawTask,
];

export const IdleTask: Task = {
  name: "Idle",
  subtasks: [
    {
      name: "Idle",
      available: () => true,
      progress: () => {return},
      completed: () => false,
    },
  ],
};

export function printTaskList(tasks: Task[]) {
  tasks.forEach(task => {
    print(`${task.name}:`);

    task.subtasks.forEach(subtask => {
      if (!subtask.available())
        return;

      if (subtask.mainstat && myMainstat() < subtask.mainstat)
        return;

      const completed = subtask.completed();

      print(`- ${subtask.name}: ${completed ? "" : "in"}complete`)
    });
  });
};
