import { print } from "kolmafia";
import { myMainstat } from "../lib/Utils";
import { UnlockFallbotLocationsTask } from "../shinies/Fallbot";
import { ConfigureTrainsetTask } from "../shinies/ModelTrainset";
import { AscensionStartTask, UnlockGuildTask } from "./ascension/AscensionStart";
import { L02Task } from "./ascension/L02SpookyForest";
import { L03Task } from "./ascension/L03TypicalTavern";
import { L04Task } from "./ascension/L04BossBat";
import { CloversTask, DailyDungeonTask, IngredientsTask, MrKlawTask, OliverFightsTask, PvpFightsTask, RockGardenTask } from "./Daily";
import { AcquireMcdTask } from "./MiscTasks";
import { Task } from "./Task";

export const AscensionTasks: Task[] = [
  AscensionStartTask,
  ConfigureTrainsetTask,
  UnlockFallbotLocationsTask,
  UnlockGuildTask,
  AcquireMcdTask,
  L02Task,
  L03Task,
  L04Task,
];

export const DailyTasks: Task[] = [
  CloversTask,
  IngredientsTask,
  PvpFightsTask,
  OliverFightsTask,
  RockGardenTask,
  MrKlawTask,
  DailyDungeonTask,
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
