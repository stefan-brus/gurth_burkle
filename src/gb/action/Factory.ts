import { Location, adv1, visitUrl } from "kolmafia";
import { Logger } from "../log/Logger";
import { Action, ActionResult, WithCondition } from "./Action";

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
  }
};
