import { buy, create, drink, eat, getCampground, getProperty, haveEffect, Item, itemAmount, mpCost, myAdventures, myInebriety, myLevel, myMaxmp, myMeat, myPrimestat, stillsAvailable, use, userConfirm, useSkill } from "kolmafia";
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
  if (!Object.keys(getCampground()).includes("Dramatic&trade; range") && myMeat() < 1000) {
    return;
  }

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
  if (!Object.keys(getCampground()).includes("Queue Du Coq cocktailcrafting kit") && myMeat() < 1000) {
    return;
  }
  
  const inebrietyAvailable = BoozePriority.reduce<number>((acc, item) => acc + item.inebriety * itemAmount(item), 0);
  let inebrietyCreated = 0;

  use(itemAmount($item`booze bindle`), $item`booze bindle`);

  if (myPrimestat === $stat`Moxie`) {
    inebrietyCreated += tryCreateMoxieDrinks(ExtraFruityDrinks, liverRemaining() - inebrietyAvailable - inebrietyCreated);
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

const DrinkIngredients: Map<Item, Item[]> = new Map([
  [$item`Divine`, [$item`bottle of Domesticated Turkey`, $item`kumquat`]],
  [$item`gimlet`, [$item`bottle of Calcutta Emerald`, $item`tonic water`]],
  [$item`Gordon Bennett`, [$item`boxed champagne`, $item`kumquat`]],
  [$item`Mae West`, [$item`bottle of Domesticated Turkey`, $item`raspberry`]],
  [$item`mandarina colada`, [$item`bottle of Lieutenant Freeman`, $item`tangerine`]],
  [$item`Mon Tiki`, [$item`bottle of Lieutenant Freeman`, $item`kiwi`]],
  [$item`Neuromancer`, [$item`bottle of Calcutta Emerald`, $item`cocktail onion`]],
  [$item`prussian cathouse`, [$item`boxed Champagne`, $item`raspberry`]],
  [$item`tangarita`, [$item`bottle of Jorge Sinsonte`, $item`tangerine`]],
  [$item`teqiwila slammer`, [$item`bottle of Jorge Sinsonte`, $item`kiwi`]],
  [$item`vodka stratocaster`, [$item`bottle of Definit`, $item`cocktail onion`]],
  [$item`yellow brick road`, [$item`bottle of Definit`, $item`tonic water`]],
]);

const StillIngredients: Map<Item, Item> = new Map([
  // Alcohol
  [$item`bottle of Calcutta Emerald`, $item`bottle of gin`],
  [$item`bottle of Lieutenant Freeman`, $item`bottle of rum`],
  [$item`bottle of Jorge Sinsonte`, $item`bottle of tequila`],
  [$item`bottle of Definit`, $item`bottle of vodka`],
  [$item`bottle of Domesticated Turkey`, $item`bottle of whiskey`],
  [$item`boxed champagne`, $item`boxed wine`],
  [$item`bottle of Ooze-O`, $item`bottle of sewage schnapps`],
  [$item`bottle of Pete's Sake`, $item`bottle of sake`],

  // Mixer
  [$item`tangerine`, $item`grapefruit`],
  [$item`kiwi`, $item`lemon`],
  [$item`cocktail onion`, $item`olive`],
  [$item`kumquat`, $item`orange`],
  [$item`tonic water`, $item`soda water`],
  [$item`raspberry`, $item`strawberry`],
]);

function getStillItems(alcohol: Item, mixer: Item): [Item, Item] {
  const alcoholItem = StillIngredients.get(alcohol);
  if (alcoholItem === undefined)
    throw new Error("Unknown still alcohol: " + alcohol.name);

  const mixerItem = StillIngredients.get(mixer);
  if (mixerItem === undefined)
    throw new Error("Unknown still mixer: " + mixer.name);
  
  return [alcoholItem, mixerItem];
}

function tryCreateMoxieDrinks(drinks: Item[], inebriety: number): number {
  let inebrietyCreated = 0;

  for (const drink of drinks) {
    if (inebrietyCreated >= inebriety) {
      break;
    }

    const ingredients = DrinkIngredients.get(drink);
    if (ingredients === undefined)
      throw new Error("Unknow still drink: " + drink.name);
    const [alcohol, mixer] = ingredients;
    const [alcoholItem, mixerItem] = getStillItems(alcohol, mixer);

    while (stillsAvailable() >= 2 && itemAmount(alcoholItem) > 0 && itemAmount(mixerItem) > 0) {
      create(1, alcohol);
      create(1, mixer);
    }

    while (haveIngredients(drink) && inebrietyCreated < inebriety && create(1, drink)) {
      inebrietyCreated += drink.inebriety;
    }
  }

  return inebrietyCreated;
}

function tryCreateDrinks(drinks: Item[], inebriety: number): number {
  let inebrietyCreated = 0;

  for (const drink of drinks) {
    if (inebrietyCreated >= inebriety) {
      break;
    }

    while (haveIngredients(drink) && inebrietyCreated < inebriety && create(1, drink)) {
      inebrietyCreated += drink.inebriety;
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
