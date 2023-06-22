import { Item, Location, availableAmount, equippedAmount, itemAmount, setProperty } from "kolmafia";
import { ActionsFactory } from "../action/Factory";
import { Task } from "./Task";
import { acquireItem } from "../item/Acquire";

type IsTaskCompleted = () => boolean;

export const TaskFactory = {
  // Visit a URL
  urlTask: (name: string, url: string, completed: IsTaskCompleted, requires?: Task[]): Task => {
    return {
      name: name,
      actions: () => {
        return [ActionsFactory.urlAction(name, url)];
      },
      completed: completed,
      requires: requires,
    };
  },

  // Acquire an item
  acquireItemTask: (item: Item, count: number = 1, requires?: Task[]): Task => {
    const info = acquireItem(item, count);
    return {
      name: `Acquire ${count} of item: ${item.name}`,
      actions: () => info.actions,
      completed: () => availableAmount(item) >= count,
      requires: info.requires?.concat(requires ? requires : []),
    };
  },

  // Adventure in a location
  adventureTask: (name: string, location: Location, completed: IsTaskCompleted, requires?: Task[]): Task => {
    return {
      name: name,
      actions: () => {
        return [ActionsFactory.adventure(name, location, completed)];
      },
      completed: completed,
      requires: requires,
    };
  },

  // Adventure in a location, expecting a specific choice
  adventureChoiceTask: (name: string, location: Location, choiceAdv: number, choiceNo: number, completed: IsTaskCompleted, requires?: Task[]): Task => {
    const ChoiceAdv = `choiceAdventure${choiceAdv}`;
    setProperty(ChoiceAdv, choiceNo.toString());

    return {
      name: name,
      actions: () => {
        return [ActionsFactory.adventure(name, location, completed)];
      },
      completed: completed,
      requires: requires,
    };
  },
}
