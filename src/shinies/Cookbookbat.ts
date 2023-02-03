import { getInventory, itemAmount, knollAvailable } from "kolmafia";
import { $item } from "libram";

export function availableCbbFoods(): number {
  const knollFactor = knollAvailable() ? 1 : 2;

  const jarlsbergFoods = Math.floor(itemAmount($item`Vegetable of Jarlsberg`) / 2);
  const borisFoods = Math.floor(itemAmount($item`Yeast of Boris`) / knollFactor);
  const peteFoods = Math.floor(itemAmount($item`St. Sneaky Pete's Whey`) / knollFactor);

  return jarlsbergFoods + borisFoods + peteFoods;
}
