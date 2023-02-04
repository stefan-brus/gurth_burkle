import { getIngredients, Item, itemAmount, myBuffedstat, myDaycount, myPrimestat } from "kolmafia";
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
