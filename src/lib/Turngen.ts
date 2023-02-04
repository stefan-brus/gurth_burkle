import { buy, create, drink, eat, Item, itemAmount, myPrimestat, userConfirm } from "kolmafia";
import { $item, $stat } from "libram";
import { cookCbbFoods } from "../shinies/Cookbookbat";
import { liverRemaining, stomachRemaining } from "./Organs";

export function generateAdventures() {
  generateStomach();
  generateLiver();
}

function generateStomach() {
  cookCbbFoods(stomachRemaining());

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
  ...ExtraFruityDrinks,
  ...FruityGirlDrinks,
  $item`Charleston Choo-Choo`,
  $item`Boris's Beer`,
  $item`shot of wasp venom`,
  $item`AutumnFest ale`,
  $item`void lager`,
]

function generateLiver() {
  let inebrietyCreated = 0;

  if (myPrimestat === $stat`Moxie`) {
    inebrietyCreated += tryCreateDrinks(ExtraFruityDrinks, liverRemaining() - inebrietyCreated);
  }

  inebrietyCreated += tryCreateDrinks(FruityGirlDrinks, liverRemaining() - inebrietyCreated);
  inebrietyCreated += tryCreateDrinks([$item`Boris's beer`], liverRemaining() - inebrietyCreated);
  inebrietyCreated += tryBuyFromOlivers(liverRemaining() - inebrietyCreated);

  for (const drink of BoozePriority) {
    if (itemAmount(drink) > 0) {
      drinkMax(drink);
    }
  }
}

function tryCreateDrinks(drinks: Item[], inebriety: number): number {
  let inebrietyCreated = 0;

  for (const drink of drinks) {
    while (inebrietyCreated < inebriety && create(1, drink)) {
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
    if (buy(1, $item`Charleston Choo-Choo`)) {
      inebrietyBought += 3;
    }
  }

  return inebrietyBought;
}

function drinkMax(booze: Item) {
  while (liverRemaining() >= booze.inebriety && itemAmount(booze) > 0) {
    if (userConfirm(`Drink 1 ${booze.name}?`)) {
      drink(1, booze);
    }
    else {
      throw new Error("User aborted while drinking");
    }
  }
}
