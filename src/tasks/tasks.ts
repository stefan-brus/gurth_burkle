import { print } from "kolmafia";
import { myMainstat } from "../lib/Utils";
import { CMGFreeFightsTask } from "../shinies/CMG";
import { LocketTasks } from "../shinies/CombatLocket";
import { UnlockFallbotLocationsTask } from "../shinies/Fallbot";
import { CraftGrubbyWoolTask } from "../shinies/HoboSheep";
import { ConfigureTrainsetTask } from "../shinies/ModelTrainset";
import { RufusQuestTask } from "../shinies/PayPhone";
import { DistillSweatTask } from "../shinies/Stillsuit";
import { SweatBoozeTask } from "../shinies/Sweatpants";
import { AscensionStartTask, UnlockGuildTask } from "./ascension/AscensionStart";
import { AzazelTask } from "./ascension/Azazel";
import { DigitalKeyTask } from "./ascension/DigitalKey";
import { HiddenTempleTask } from "./ascension/HiddenTemple";
import { L02Task } from "./ascension/L02SpookyForest";
import { L03Task } from "./ascension/L03TypicalTavern";
import { L04Task } from "./ascension/L04BossBat";
import { L05Task } from "./ascension/L05GoblinKing";
import { L06Task } from "./ascension/L06DeepFatFriars";
import { L07Task } from "./ascension/L07Cyrpt";
import { L08Task } from "./ascension/L08Trapper";
import { L09Task } from "./ascension/L09OrcChasm";
import { L10Task } from "./ascension/L10GiantTrash";
import { L11BlackForestTask } from "./ascension/L11Macguffin/BlackForest";
import { L11DesertTask } from "./ascension/L11Macguffin/Desert";
import { L11HiddenCityTask, L11HiddenTempleTask } from "./ascension/L11Macguffin/HiddenCity";
import { L11ManorCellarTask } from "./ascension/L11Macguffin/ManorCellar";
import { L11PalindomeTask } from "./ascension/L11Macguffin/Palindome";
import { L11PyramidTask } from "./ascension/L11Macguffin/Pyramid";
import { L11RedZeppelinTask } from "./ascension/L11Macguffin/RedZeppelin";
import { L11ShenCopperheadTask } from "./ascension/L11Macguffin/ShenCopperhead";
import { L12Part1Task, L12Part2Task, L12Part3Task } from "./ascension/L12MysteriousIsland";
import { L13SorceressTask } from "./ascension/L13Sorceress";
import { SpookyravenFloor1Task, SpookyravenFloor2Task } from "./ascension/Spookyraven";
import { ClassSpecificDailyTask, CloversTask, DailyDungeonTask, IngredientsTask, MayDayPackageTask, MrKlawTask, OliverFightsTask, PvpFightsTask, RockGardenTask } from "./Daily";
import { AcquireMcdTask, AcquireMeatMaidTask, BitchinMeatcarTask, CreateBadassBeltTask, StrangeLeafletTask, UnlockDispensaryTask, UnlockHoleInTheSkyTask, UnlockWhiteysGroveTask } from "./MiscTasks";
import { Task } from "./Task";

export const AscensionTasks: Task[] = [
  AscensionStartTask,
  ConfigureTrainsetTask,
  CMGFreeFightsTask,
  UnlockFallbotLocationsTask,
  UnlockGuildTask,
  BitchinMeatcarTask,
  UnlockWhiteysGroveTask,
  AcquireMcdTask,
  CreateBadassBeltTask,
  AcquireMeatMaidTask,
  CraftGrubbyWoolTask,
  LocketTasks,
  StrangeLeafletTask,
  L06Task,
  AzazelTask,
  SpookyravenFloor1Task,
  L12Part1Task,
  L02Task,
  HiddenTempleTask,
  L11BlackForestTask,
  L11HiddenTempleTask,
  SpookyravenFloor2Task,
  L04Task,
  UnlockDispensaryTask,
  L05Task,
  L07Task,
  L08Task,
  L09Task,
  L10Task,
  UnlockHoleInTheSkyTask,
  L12Part2Task,
  L11HiddenCityTask,
  L11ManorCellarTask,
  L11ShenCopperheadTask,
  L12Part3Task,
  L11DesertTask,
  L11RedZeppelinTask,
  L11PalindomeTask,
  L03Task,
  L11PyramidTask,
  DigitalKeyTask,
  L13SorceressTask,
];

export const DailyTasks: Task[] = [
  SweatBoozeTask,
  DistillSweatTask,
  MayDayPackageTask,
  CloversTask,
  IngredientsTask,
  PvpFightsTask,
  RockGardenTask,
  MrKlawTask,
  CMGFreeFightsTask,
  DailyDungeonTask,
  ClassSpecificDailyTask,
  OliverFightsTask,
  RufusQuestTask,
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
