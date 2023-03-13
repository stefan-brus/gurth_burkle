import { Item, Slot } from "kolmafia";
import { $item } from "libram";
import { selectGear } from "./Utils";

export function selectSaucerorGear(reservedSlots: Slot[]) {
  selectGear(
    reservedSlots,
    SaucerorHats,
    SaucerorCloaks,
    SaucerorShirts,
    SaucerorWeapons,
    SaucerorOffhands,
    SaucerorPants,
    SaucerorAccessories,
    SaucerorFamiliar,
  );
}

const SaucerorHats: Item[] = [
  $item`fuzzy earmuffs`,
  $item`chef's hat`,
  $item`Hollandaise helmet`,
];

const SaucerorCloaks: Item[] = [
  $item`Misty Robe`,
];

const SaucerorShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
];

const SaucerorWeapons: Item[] = [
  $item`saucepan`,
];

const SaucerorOffhands: Item[] = [
  $item`autumn debris shield`,
  $item`hot plate`,
];

const SaucerorPants: Item[] = [
  $item`snowboarder pants`,
  $item`Knob Goblin elite pants`,
  $item`old sweatpants`,
];

const SaucerorAccessories: Item[] = [
  $item`World's Best Adventurer sash`,
  $item`Nickel Gamma of Frugality`,
  $item`blackberry galoshes`,
  $item`badass belt`,
  $item`batskin belt`,
  $item`shiny ring`,
  $item`imp unity ring`,
  $item`ghost of a necklace`,
];

const SaucerorFamiliar: Item[] = [
  $item`astral pet sweater`,
];
