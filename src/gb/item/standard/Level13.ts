import { Item } from "kolmafia";
import { AcquireInfo, acquireInfo } from "../Acquire";
import { $item, $location } from "libram";
import { ActionsFactory } from "../../action/Factory";
import { TaskFactory } from "../../task/Factory";

export const Level13ItemsInfo: Map<Item, AcquireInfo> = new Map([
  [$item`Wand of Nagamar`, acquireInfo(
    [ActionsFactory.createItem($item`Wand of Nagamar`)],
    [
      TaskFactory.acquireItemTask($item`ruby W`),
      TaskFactory.acquireItemTask($item`metallic A`),
      TaskFactory.acquireItemTask($item`lowercase N`),
      TaskFactory.acquireItemTask($item`heavy D`),
    ],
  )],
  [$item`ruby W`, acquireInfo(
    [ActionsFactory.cloverAdventure(
      "Get Wand of Nagamar parts",
      $location`The Castle in the Clouds in the Sky (Basement)`,
      "You Never Know What You're Gonna Find",
    )],
  )],
  [$item`metallic A`, acquireInfo(
    [ActionsFactory.cloverAdventure(
      "Get Wand of Nagamar parts",
      $location`The Castle in the Clouds in the Sky (Basement)`,
      "You Never Know What You're Gonna Find",
    )],
  )],
  [$item`lowercase N`, acquireInfo(
    [ActionsFactory.cloverAdventure(
      "Get Wand of Nagamar parts",
      $location`The Castle in the Clouds in the Sky (Basement)`,
      "You Never Know What You're Gonna Find",
    )],
  )],
  [$item`heavy D`, acquireInfo(
    [ActionsFactory.cloverAdventure(
      "Get Wand of Nagamar parts",
      $location`The Castle in the Clouds in the Sky (Basement)`,
      "You Never Know What You're Gonna Find",
    )],
  )],
]);
