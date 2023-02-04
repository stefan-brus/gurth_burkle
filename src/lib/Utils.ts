import { getIngredients, haveEffect, haveEquipped, Item, itemAmount, myBuffedstat, myDaycount, myPrimestat, use, userConfirm } from "kolmafia";
import { $effect, $item } from "libram";
import { Constants } from "../Constants";

export function myMainstat(): number {
  const mainstat = myPrimestat();
  return myBuffedstat(mainstat);
}

export function ascensionDaysLeft(): number {
  return Constants.PredictedAscensionDays - myDaycount() + 1;
}

export function haveIngredients(item: Item): boolean {
  const ingredients = getIngredients(item);

  for (const [ingredientStr, qty] of Object.entries(ingredients)) {
    const ingredient = Item.get(ingredientStr);

    if (itemAmount(ingredient) < qty) {
      return false;
    }
  }

  return true;
}

export function haveOrEquipped(item: Item): boolean {
  return itemAmount(item) > 0 || haveEquipped(item);
}

export function checkUseClover(reason: string) {
  if (haveEffect($effect`Lucky!`) < 1 && itemAmount($item`11-leaf clover`) > 0) {
    if (userConfirm("Use 1 clover for: " + reason + "?")) {
      use(1, $item`11-leaf clover`);
    }
    else {
      throw new Error("User aborted on clover check");
    }
  }
}
