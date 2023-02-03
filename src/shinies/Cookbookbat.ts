import { getInventory, knollAvailable } from "kolmafia";

export function availableCbbFoods(): number {
  const knollFactor = knollAvailable() ? 1 : 2;
  const inv = getInventory();

  const jarlsbergFoods = Math.floor(inv["Vegetable of Jarlsberg"] / 2);
  const borisFoods = Math.floor(inv["Yeast of Boris"] / knollFactor);
  const peteFoods = Math.floor(inv["St. Sneaky Pete's Whey"] / knollFactor);

  return jarlsbergFoods + borisFoods + peteFoods;
}
