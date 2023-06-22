import { Item, Location, adv1, availableAmount, create, getProperty, haveEffect, use, visitUrl } from "kolmafia";
import { Logger } from "../log/Logger";
import { Action, ActionResult, WithCondition } from "./Action";
import { $effect, $item } from "libram";

export const ActionsFactory = {
  // Simply visit a URL to progress
  urlAction: (name: string, url: string): Action => {
    return {
      name: name,
      do: (): ActionResult => {
        Logger.info(`URL Action (${name}) - visiting ${url}`);
        visitUrl(url);
        return ActionResult.Success;
      },
    }
  },

  // Adventure until a condition is met
  adventure: (name: string, location: Location, completed: () => boolean): Action & WithCondition => {
    return {
      name: name,
      do: (): ActionResult => {
        Logger.info(`Adventure Action (${name}) - adventuring in ${location.toString()}`);

        if (!adv1(location)) {
          Logger.error(`Adventure Action (${name}) - error adventuring in ${location.toString()}`);
          return ActionResult.Fail;
        }
        else {
          return ActionResult.Success;
        }
      },
      completed: completed,
    }
  },

  // Spend a clover to get the lucky adventure in the given location
  cloverAdventure: (name: string, location: Location, luckyAdvName: string): Action & WithCondition => {
    return {
      name: name,
      do: (): ActionResult => {
        if (haveEffect($effect`Lucky!`) < 1) {
          Logger.info(`Clover Adventure Action (${name}) - getting Lucky!`);

          if (availableAmount($item`11-leaf clover`) < 1) {
            Logger.error(`Clover Adventure Action (${name}) - no clovers available`);
            return ActionResult.Fail;
          }
          else {
            use(1, $item`11-leaf clover`);
          }
        }
        
        Logger.info(`Clover Adventure Action (${name}) - adventuring in ${location.toString()}`);

        if (!adv1(location)) {
          Logger.error(`Clover Adventure Action (${name}) - error adventuring in ${location.toString()}`);
          return ActionResult.Fail;
        }
        else {
          return ActionResult.Success;
        }
      },
      completed: (): boolean => getProperty("lastEncounter") === luckyAdvName,
    }
  },

  // Create an item
  createItem: (item: Item, count: number = 1): Action => {
    return {
      name: `Create ${count} ${item.name}`,
      do: (): ActionResult => {
        Logger.info(`Create Item Action (${item.name}) - creating ${count} ${count > 1 ? item.plural : item.name}`);

        if (!create(item, count)) {
          Logger.error(`Create Item Action (${item.name}) - error creating ${item.name}`);
          return ActionResult.Fail;
        }
        else {
          return ActionResult.Success;
        }
      }
    }
  },
};
