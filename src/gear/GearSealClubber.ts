import { Item, Slot } from "kolmafia";
import { $item } from "libram";
import { selectGear } from "./Utils";

export function selectSealClubberGear(reservedSlots: Slot[]) {
  selectGear(
    reservedSlots,
    SealClubberHats,
    SealClubberCloaks,
    SealClubberShirts,
    SealClubberWeapons,
    SealClubberOffhands,
    SealClubberPants,
    SealClubberAccessories,
    SealClubberFamiliar,
  );
}

const SealClubberHats: Item[] = [
  $item`fuzzy busby`,
  $item`extra-wide head candle`,
  $item`Crown of the Goblin King`,
  $item`Knob Goblin elite helm`,
  $item`seal-skull helmet`,
];

const SealClubberCloaks: Item[] = [
  $item`Misty Cloak`,
];

const SealClubberShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
  $item`eXtreme Bi-Polar Fleece Vest`,
];

const SealClubberWeapons: Item[] = [
  $item`extra-large utility candle`,
  $item`Orcish frat-paddle`,
  $item`skeleton bone`,
  $item`seal-clubbing club`,
];

const SealClubberOffhands: Item[] = [
  $item`autumn debris shield`,
  $item`white satin shield`,
  $item`hot plate`,
];

const SealClubberPants: Item[] = [
  $item`Whoompa Fur Pants`,
  $item`snowboarder pants`,
  $item`ninja hotpants`,
  $item`Knob Goblin elite pants`,
  $item`Knob Goblin pants`,
  $item`old sweatpants`,
];

const SealClubberAccessories: Item[] = [
  $item`World's Best Adventurer sash`,
  $item`Nickel Gamma of Frugality`,
  $item`blackberry galoshes`,
  $item`badass belt`,
  $item`batskin belt`,
  $item`shiny ring`,
  $item`imp unity ring`,
];

const SealClubberFamiliar: Item[] = [
  $item`astral pet sweater`,
];
