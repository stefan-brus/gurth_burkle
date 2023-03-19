import { Item, Slot } from "kolmafia";
import { $item, $slot } from "libram";
import { selectGear } from "./Utils";

export function selectTurtleTamerGear(reservedSlots: Slot[]) {
  selectGear(
    reservedSlots,
    TurtleTamerHats,
    TurtleTamerCloaks,
    TurtleTamerShirts,
    TurtleTamerWeapons,
    TurtleTamerOffhands,
    TurtleTamerPants,
    TurtleTamerAccessories,
    TurtleTamerFamiliar,
  );
}

const TurtleTamerHats: Item[] = [
  $item`fuzzy busby`,
  $item`extra-wide head candle`,
  $item`Crown of the Goblin King`,
  $item`Knob Goblin elite helm`,
  $item`chef's hat`,
  $item`helmet turtle`,
];

const TurtleTamerCloaks: Item[] = [
  $item`Misty Cloak`,
  $item`frozen turtle shell`,
  $item`whatsit-covered turtle shell`,
];

const TurtleTamerShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
  $item`eXtreme Bi-Polar Fleece Vest`,
];

const TurtleTamerWeapons: Item[] = [
  $item`extra-large utility candle`,
  $item`Orcish frat-paddle`,
  $item`skeleton bone`,
  $item`Knob Goblin scimitar`,
  $item`turtle totem`,
];

const TurtleTamerOffhands: Item[] = [
  $item`autumn debris shield`,
  $item`white satin shield`,
  $item`hot plate`,
];

const TurtleTamerPants: Item[] = [
  $item`Whoompa Fur Pants`,
  $item`snowboarder pants`,
  $item`ninja hotpants`,
  $item`Knob Goblin elite pants`,
  $item`Knob Goblin pants`,
  $item`old sweatpants`,
];

const TurtleTamerAccessories: Item[] = [
  $item`World's Best Adventurer sash`,
  $item`Nickel Gamma of Frugality`,
  $item`blackberry galoshes`,
  $item`badass belt`,
  $item`batskin belt`,
  $item`tortoboggan`,
  $item`shiny ring`,
  $item`imp unity ring`,
];

const TurtleTamerFamiliar: Item[] = [
  $item`astral pet sweater`,
];
