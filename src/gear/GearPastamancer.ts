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
  $item`fuzzy earmuffs`,
  $item`chef's hat`,
  $item`ravioli hat`,
];

const PastamancerCloaks: Item[] = [
  $item`Misty Robe`,
];

const PastamancerShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
];

const PastamancerWeapons: Item[] = [
  $item`oversized pizza cutter`,
  $item`huge spoon`,
  $item`Knob Goblin tongs`,
  $item`pasta spoon`,
];

const PastamancerOffhands: Item[] = [
  $item`autumn debris shield`,
  $item`hot plate`,
];

const PastamancerPants: Item[] = [
  $item`snowboarder pants`,
  $item`Knob Goblin elite pants`,
  $item`old sweatpants`,
];

const PastamancerAccessories: Item[] = [
  $item`World's Best Adventurer sash`,
  $item`Nickel Gamma of Frugality`,
  $item`blackberry galoshes`,
  $item`badass belt`,
  $item`batskin belt`,
  $item`shiny ring`,
  $item`imp unity ring`,
  $item`ghost of a necklace`,
];

const PastamancerFamiliar: Item[] = [
  $item`astral pet sweater`,
];
