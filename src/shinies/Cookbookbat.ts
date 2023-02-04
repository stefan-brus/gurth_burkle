import { buy, create, itemAmount, knollAvailable, myPrimestat } from "kolmafia";
import { $item, $stat } from "libram";
import { haveIngredients } from "../lib/Utils";

export function availableCbbFoods(): number {
  const knollFactor = knollAvailable() ? 1 : 2;

  const jarlsbergFoods = Math.floor(itemAmount($item`Vegetable of Jarlsberg`) / 2);
  const borisFoods = Math.floor(itemAmount($item`Yeast of Boris`) / knollFactor);
  const peteFoods = Math.floor(itemAmount($item`St. Sneaky Pete's Whey`) / knollFactor);

  return jarlsbergFoods + borisFoods + peteFoods;
}

export function cookCbbFoods(amount: number) {
  let totalCooked = 0;
  if (myPrimestat() === $stat`Muscle`) {
    totalCooked += cookBorisFoods(amount - totalCooked);
    totalCooked += cookPeteFoods(amount - totalCooked);
    totalCooked += cookJarlsbergFoods(amount - totalCooked);
  }
  else if (myPrimestat() === $stat`Mysticality`) {
    totalCooked += cookJarlsbergFoods(amount - totalCooked);
    totalCooked += cookPeteFoods(amount - totalCooked);
    totalCooked += cookBorisFoods(amount - totalCooked);
  }
  else {
    totalCooked += cookPeteFoods(amount - totalCooked);
    totalCooked += cookBorisFoods(amount - totalCooked);
    totalCooked += cookJarlsbergFoods(amount - totalCooked);
  }
}

function cookBorisFoods(amount: number): number {
  const food = knollAvailable() ? $item`honey bun of Boris` : $item`Boris's bread`;
  let cooked = 0;

  while (itemAmount(food) < amount && haveIngredients(food)) {
    if (knollAvailable() && !buy(1, $item`flat dough`)) {
      break;
    }

    if (!create(1, food)) {
      break;
    }

    cooked++;
  }

  return cooked;
}

function cookPeteFoods(amount: number): number {
  const food = knollAvailable() ? $item`Pete's wiley whey bar` : $item`Pete's rich ricotta`;
  let cooked = 0;

  while (itemAmount(food) < amount && haveIngredients(food)) {
    if (knollAvailable() && !buy(1, $item`wad of dough`)) {
      break;
    }

    if (!create(1, food)) {
      break;
    }

    cooked++;
  }

  return cooked;
}

function cookJarlsbergFoods(amount: number): number {
  const food = $item`roasted vegetable of Jarlsberg`;
  let cooked = 0;

  while (itemAmount(food) < amount && haveIngredients(food)) {
    if (!create(1, food)) {
      break;
    }

    cooked++;
  }

  return cooked;
}
