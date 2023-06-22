import { Item, availableAmount, inHardcore, pullsRemaining, storageAmount, takeStorage } from "kolmafia";
import { Action } from "../action/Action";
import { $item } from "libram";
import { ActionsFactory } from "../action/Factory";
import { Task } from "../task/Task";
import { TaskFactory } from "../task/Factory";
import { Level13ItemsInfo } from "./standard/Level13";

export type AcquireInfo = {
  actions: Action[],
  requires?: Task[],
}

export function acquireInfo(actions: Action[], requires?: Task[]): AcquireInfo {
  return {
    actions: actions,
    requires: requires,
  };
}

export function acquireItem(item: Item, count: number): AcquireInfo {
  if (!AcquireItemsInfo.has(item))
    throw new Error(`Acquire item logic for ${item.name} needs implementation`);

  if (availableAmount(item) < count) {
    // Check hagnks, unless in hardcore
    if (!item.quest && !inHardcore() && pullsRemaining() > 0) {
      if (storageAmount(item) > 0) {
        takeStorage(item, 1);
      }
    }
  }

  return AcquireItemsInfo.get(item)!;
}

const AcquireItemsInfo: Map<Item, AcquireInfo> = new Map([
  ...Level13ItemsInfo.entries(),
]);
