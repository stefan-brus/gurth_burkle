import { council, getProperty, inebrietyLimit, myAdventures, myClass, myInebriety, print, setProperty, userConfirm } from "kolmafia";
import { Constants } from "./Constants";
import { mainAdventure } from "./lib/Adventure";
import { selectEquipment } from "./gear/Equipment";
import { selectFamiliar } from "./lib/Familiar";
import { myMainstat } from "./lib/Utils";
import { fallbotRoutine } from "./shinies/Fallbot";
import { Subtask, Task } from "./tasks/Task";
import { AscensionTasks, DailyTasks, IdleTask } from "./tasks/Tasks";
import { selectBuffs } from "./lib/Buffs";
import { acquireTrainableSkills } from "./lib/Skill";
import { generateAdventures } from "./lib/Turngen";
import { selectPotions } from "./lib/Potion";
import { $class } from "libram";
import { selectThrall } from "./lib/Thrall";
import { checkBurnDelay } from "./lib/Delay";
import { selectSpecialEffects } from "./lib/SpecialEffects";
import { selectSpleen } from "./lib/Spleen";
import { Properties } from "./Properties";
import { selectSongs } from "./lib/Songs";
import { setJuneCleaverChoices } from "./shinies/JuneCleaver";
import { monkeyPawRemainingWishes, useUpWishes } from "./shinies/MonkeyPaw";
import { Config } from "./Config";

export function ascend() {
  print("Starting main ascension loop");

  setJuneCleaverChoices();

  let currentTask = IdleTask;
  let currentSubtask = currentTask.subtasks[0];

  while (!isDayOver()) {
    const newTask = chooseTask();
    if (newTask !== currentTask) {
      currentTask = newTask;

      if (Config.PromptTasks && !userConfirm("Start task " + currentTask.name + "?")) {
        throw new Error("User aborted on task " + currentTask.name);
      }

      print("Completing task " + currentTask.name);
    }

    if (getProperty(Properties.Daily.FocusTask) !== "true" || currentSubtask.completed()) {
      const newSubtask = chooseSubtask(currentTask);
      if (newSubtask !== currentSubtask) {
        currentSubtask = newSubtask;

        if (Config.PromptSubtasks && !userConfirm("Start subtask " + currentSubtask.name + "?")) {
          throw new Error("User aborted on subtask " + currentSubtask.name);
        }

        if (newSubtask.focusTask) {
          setProperty(Properties.Daily.FocusTask, "true");
        }
        else {
          setProperty(Properties.Daily.FocusTask, "false");
        }

        if (newSubtask.spikesTask) {
          setProperty(Properties.Daily.SpikolodonTask, "true");
        }
        else {
          setProperty(Properties.Daily.SpikolodonTask, "false");
        }

        print("Completing subtask "+ currentSubtask.name);
      }
    }

    const progress = currentSubtask.progress();
    if (progress !== undefined) { // Adventure time
      if (myClass() === $class`Pastamancer`)
        selectThrall(progress);
        
      generateAdventures();
      acquireTrainableSkills();
      selectFamiliar(progress);
      selectEquipment(progress);
      selectBuffs(progress);
      selectSongs(progress);
      selectPotions(progress);
      selectSpleen(progress);
      selectSpecialEffects(progress);
      fallbotRoutine();
      checkBurnDelay(progress);
      mainAdventure(progress);
    }

    if (currentSubtask.completed()) {
      print("Subtask " + currentSubtask.name + " completed.");
      council();
    }
  }

  print("Done for the day");
  if (getProperty("kingLiberated") !== "true") {
    print("Still in run, doing end-of-day routine");
    useUpWishes(monkeyPawRemainingWishes());
  }
}

function isDayOver(): boolean {
  return myAdventures() <= Constants.ReservedAdventures || myInebriety() > inebrietyLimit();
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
  if (subtask.mainstat && myMainstat() < subtask.mainstat) {
    return false;
  }
  
  return subtask.available() && !subtask.completed();
}
