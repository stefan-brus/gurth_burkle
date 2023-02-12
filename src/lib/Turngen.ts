import { buy, create, drink, eat, getProperty, haveEffect, Item, itemAmount, mpCost, myAdventures, myInebriety, myLevel, myMaxmp, myPrimestat, use, userConfirm, useSkill } from "kolmafia";
import { $coinmaster, $effect, $item, $skill, $stat } from "libram";
import { cookCbbFoods } from "../shinies/Cookbookbat";
import { billiardsRoomDone } from "../tasks/ascension/Spookyraven";
import { liverRemaining, stomachRemaining } from "./Organs";
import { haveIngredients } from "./Utils";

export function generateAdventures() {
  if (stomachRemaining() > 0) {
    generateStomach();
  }

  if (liverRemaining() > 0 && myMaxmp() > mpCost($skill`The Ode to Booze`)) {
    generateLiver();
  }
}

const MilkUsedProperty = "_milkOfMagnesiumUsed";

function generateStomach() {
  if (myLevel() >= 11 && stomachRemaining() >= $item`astral hot dog`.fullness) {
    eatToMax($item`astral hot dog`);
  }

  cookCbbFoods(stomachRemaining());

  if (getProperty(MilkUsedProperty) === "false") {
    if (itemAmount($item`milk of magnesium`) > 0 || (haveIngredients($item`milk of magnesium`) && create(1, $item`milk of magnesium`))) {
      use(1, $item`milk of magnesium`);
    }
  }

  use(itemAmount($item`whet stone`), $item`whet stone`);

  eatToMax($item`honey bun of Boris`);
  eatToMax($item`Boris's Bread`);
  eatToMax($item`Pete's wiley whey bar`);
  eatToMax($item`Pete's rich ricotta`);
  eatToMax($item`roasted vegetable of Jarlsberg`);
}

function eatToMax(item: Item) {
  if (itemAmount(item) > 0) {
    if (userConfirm(`Eat ${itemAmount(item)} of ${item.name}?`)) {
      eat(Math.min(stomachRemaining(), itemAmount(item)), item);
    }
    else {
      throw new Error("User aborted while eating");
    }
  }
}

const ExtraFruityDrinks: Item[] = [
  $item`Divine`,
  $item`gimlet`,
  $item`Gordon Bennett`,
  $item`Mae West`,
  $item`mandarina colada`,
  $item`Mon Tiki`,
  $item`Neuromancer`,
  $item`prussian cathouse`,
  $item`tangarita`,
  $item`teqiwila slammer`,
  $item`vodka stratocaster`,
  $item`yellow brick road`,
];

const FruityGirlDrinks: Item[] = [
  $item`a little sump'm sump'm`,
  $item`blended frozen swill`,
  $item`calle de miel`,
  $item`ducha de oro`,
  $item`fruity girl swill`,
  $item`fuzzbump`,
  $item`horizontal tango`,
  $item`ocean motion`,
  $item`perpendicular hula`,
  $item`pink pony`,
  $item`rockin' wagon`,
  $item`roll in the hay`,
  $item`slap and tickle`,
  $item`slip 'n' slide`,
  $item`tropical swill`,
];

const BoozePriority: Item[] = [
  $item`Boris's Beer`,
  ...ExtraFruityDrinks,
  $item`shot of wasp venom`,
  $item`AutumnFest ale`,
  $item`void lager`,
  ...FruityGirlDrinks,
  $item`Charleston Choo-Choo`,
]

function generateLiver() {
  const inebrietyAvailable = BoozePriority.reduce<number>((acc, item) => acc + item.inebriety * itemAmount(item), 0);
  let inebrietyCreated = 0;

  if (myPrimestat === $stat`Moxie`) {
    inebrietyCreated += tryCreateDrinks(ExtraFruityDrinks, liverRemaining() - inebrietyAvailable - inebrietyCreated);
  }

  inebrietyCreated += tryCreateDrinks(FruityGirlDrinks, liverRemaining() - inebrietyAvailable - inebrietyCreated);
  inebrietyCreated += tryCreateDrinks([$item`Boris's beer`], liverRemaining() - inebrietyAvailable - inebrietyCreated);
  inebrietyCreated += tryBuyFromOlivers(liverRemaining() - inebrietyAvailable - inebrietyCreated);
  
  for (const drink of BoozePriority) {
    if (itemAmount(drink) > 0) {
      drinkMax(drink);
    }
  }
}

function tryCreateDrinks(drinks: Item[], inebriety: number): number {
  let inebrietyCreated = 0;

  for (const drink of drinks) {
    while (haveIngredients(drink) && inebrietyCreated < inebriety && create(1, drink)) {
      inebrietyCreated += drink.inebriety;
    }

    if (inebrietyCreated >= inebriety) {
      break;
    }
  }

  return inebrietyCreated;
}

function tryBuyFromOlivers(inebriety: number): number {
  let inebrietyBought = 0;

  while (inebrietyBought < inebriety && itemAmount($item`drink chit`) > 0) {
    if (buy($coinmaster`Fancy Dan the Cocktail Man`, 1, $item`Charleston Choo-Choo`)) {
      inebrietyBought += 3;
    }
  }

  return inebrietyBought;
}

function drinkMax(booze: Item) {
  while (liverRemaining() >= booze.inebriety && itemAmount(booze) > 0) {
    if (!billiardsRoomDone() && myInebriety() + booze.inebriety > 10 && myAdventures() > 10) {
      // Try to keep inebriety around 10 until billiards room is done, unless we really need adventures
      break;
    }

    if (userConfirm(`Drink 1 ${booze.name}?`)) {
      while (haveEffect($effect`Ode to Booze`) < booze.inebriety) {
        if (!useSkill(1, $skill`The Ode to Booze`)) {
          throw new Error("Unable to cast The Ode to Booze");
        }
      }

      drink(1, booze);
    }
    else {
      throw new Error("User aborted while drinking");
    }
  }
}
