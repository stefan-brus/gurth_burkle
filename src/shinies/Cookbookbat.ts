import { buy, create, eat, itemAmount, knollAvailable, myPrimestat, Stat } from "kolmafia";
import { $item, $stat } from "libram";
import { haveIngredients } from "../lib/Utils";

export function availableCbbFoods(): number {
  const knollFactor = knollAvailable() ? 1 : 2;

  const jarlsbergFoods = Math.floor(itemAmount($item`Vegetable of Jarlsberg`) / 2);
  const borisFoods = Math.floor(itemAmount($item`Yeast of Boris`) / knollFactor);
  const peteFoods = Math.floor(itemAmount($item`St. Sneaky Pete's Whey`) / knollFactor);

  return jarlsbergFoods + borisFoods + peteFoods;
}

export function tryEatCbbFood(): boolean {
  let eaten = false;

  const eatAttempts = CbbFoodStatPriority.get(myPrimestat())!;
  eatAttempts.forEach(attempt => {
    if (!eaten) {
      eaten = attempt();
    }
  });

  return eaten;
}

type TryEatCbbFood = () => boolean;

const CbbFoodStatPriority: Map<Stat, TryEatCbbFood[]> = new Map([
  [$stat`Muscle`, [
    tryEatBoris,
    tryEatPete,
    tryEatJarlsberg,
  ]],
  [$stat`Mysticality`, [
    tryEatJarlsberg,
    tryEatPete,
    tryEatBoris,
  ]],
  [$stat`Moxie`, [
    tryEatPete,
    tryEatBoris,
    tryEatJarlsberg,
  ]],
]);

function tryEatBoris(): boolean {
  let result = false;

  if (knollAvailable()) {
    if (itemAmount($item`Yeast of Boris`) >=  1) {
      if (itemAmount($item`flat dough`) >= 1 || buy(1, $item`flat dough`)) {
        create(1, $item`honey bun of Boris`);
      }
    }

    if (itemAmount($item`honey bun of Boris`) >= 1) {
      eat(1, $item`honey bun of Boris`);
      result = true;
    }
  }
  else {
    if (itemAmount($item`Yeast of Boris`) >= 2) {
      create(1, $item`Boris's bread`);
    }

    if (itemAmount($item`Boris's bread`) >= 1) {
      eat(1, $item`Boris's bread`);
      result = true;
    }
  }

  return result;
}

function tryEatPete(): boolean {
  let result = false;

  if (knollAvailable()) {
    if (itemAmount($item`St. Sneaky Pete's Whey`) >=  1) {
      if (itemAmount($item`wad of dough`) >= 1 || buy(1, $item`wad of dough`)) {
        create(1, $item`Pete's wiley whey bar`);
      }
    }

    if (itemAmount($item`Pete's wiley whey bar`) >= 1) {
      eat(1, $item`Pete's wiley whey bar`);
      result = true;
    }
  }
  else {
    if (itemAmount($item`St. Sneaky Pete's Whey`) >= 2) {
      create(1, $item`Pete's rich ricotta`);
    }

    if (itemAmount($item`Pete's rich ricotta`) >= 1) {
      eat(1, $item`Pete's rich ricotta`);
      result = true;
    }
  }

  return result;
}

function tryEatJarlsberg(): boolean {
  let result = false;

  if (itemAmount($item`vegetable of Jarlsberg`) >= 2) {
    create(1, $item`roasted vegetable of Jarlsberg`);
  }

  if (itemAmount($item`roasted vegetable of Jarlsberg`) >= 1) {
    eat(1, $item`roasted vegetable of Jarlsberg`);
    result = true;
  }

  return result;
}
