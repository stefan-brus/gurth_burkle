import { Item, itemAmount } from "kolmafia";
import { $item } from "libram";

export function chooseItemFromPriorityList(gearList: Item[], current: Item): Item {
  /**
   * Selects the highest priority item from the list that is available, that is of higher priority than the currently equipped one.
   */

  let result = current;

  for (const item of gearList) {
    if (item === current || itemAmount(item) > 0) {
      result = item;
      break;
    }
  }

  return result;
}
