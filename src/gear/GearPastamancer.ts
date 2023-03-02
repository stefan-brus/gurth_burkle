import { Item, Slot } from "kolmafia";
import { $item } from "libram";
import { selectGear } from "./Utils";

export function selectPastamancerGear(reservedSlots: Slot[]) {
  selectGear(
    reservedSlots,
    PastamancerHats,
    PastamancerCloaks,
    PastamancerShirts,
    PastamancerWeapons,
    PastamancerOffhands,
    PastamancerPants,
    PastamancerAccessories,
    PastamancerFamiliar,
  );
}

const PastamancerHats: Item[] = [
  $item`ravioli hat`,
];

const PastamancerCloaks: Item[] = [
  $item`Misty Robe`,
];

const PastamancerShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
];

const PastamancerWeapons: Item[] = [
  $item`pasta spoon`,
];

const PastamancerOffhands: Item[] = [
  $item`autumn debris shield`,
];

const PastamancerPants: Item[] = [
  $item`old sweatpants`,
];

const PastamancerAccessories: Item[] = [
  $item`World's Best Adventurer sash`,
  $item`Nickel Gamma of Frugality`,
  $item`blackberry galoshes`,
  $item`badass belt`,
  $item`batskin belt`,
  $item`shiny ring`,
];

const PastamancerFamiliar: Item[] = [
  $item`astral pet sweater`,
];
