import { print } from "kolmafia";
import { myMainstat } from "../lib/Utils";
import { UnlockFallbotLocationsTask } from "../shinies/Fallbot";
import { ConfigureTrainsetTask } from "../shinies/ModelTrainset";
import { AscensionStartTask, UnlockGuildTask } from "./ascension/AscensionStart";
import { AzazelTask } from "./ascension/Azazel";
import { L02Task } from "./ascension/L02SpookyForest";
import { L03Task } from "./ascension/L03TypicalTavern";
import { L04Task } from "./ascension/L04BossBat";
import { L05Task } from "./ascension/L05GoblinKing";
import { L06Task } from "./ascension/L06DeepFatFriars";
import { L07Task } from "./ascension/L07Cyrpt";
import { L08Task } from "./ascension/L08Trapper";
import { L10Task } from "./ascension/L10GiantTrash";
import { CloversTask, DailyDungeonTask, IngredientsTask, MrKlawTask, OliverFightsTask, PvpFightsTask, RockGardenTask } from "./Daily";
import { AcquireMcdTask, AcquireMeatMaidTask, BitchinMeatcarTask, CreateBadassBeltTask, UnlockDispensaryTask, UnlockHoleInTheSkyTask, UnlockWhiteysGroveTask } from "./MiscTasks";
import { Task } from "./Task";

export const AscensionTasks: Task[] = [
  AscensionStartTask,
  ConfigureTrainsetTask,
  UnlockFallbotLocationsTask,
  UnlockGuildTask,
  BitchinMeatcarTask,
  UnlockWhiteysGroveTask,
  AcquireMcdTask,
  L02Task,
  L06Task,
  AzazelTask,
  L03Task,
  L04Task,
  UnlockDispensaryTask,
  L05Task,
  L07Task,
  CreateBadassBeltTask,
  AcquireMeatMaidTask,
  L08Task,
  L10Task,
  UnlockHoleInTheSkyTask,
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
