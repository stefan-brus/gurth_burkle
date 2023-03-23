import { Item, Slot } from "kolmafia";
import { $item } from "libram";
import { selectGear } from "./Utils";

export function selectAccordionThiefGear(reservedSlots: Slot[]) {
  selectGear(
    reservedSlots,
    DiscoBanditHats,
    DiscoBanditCloaks,
    DiscoBanditShirts,
    DiscoBanditWeapons,
    DiscoBanditOffhands,
    DiscoBanditPants,
    DiscoBanditAccessories,
    DiscoBanditFamiliar,
  );
}

const DiscoBanditHats: Item[] = [
  $item`fuzzy montera`,
  $item`extra-wide head candle`,
  $item`brown paper bag mask`,
  $item`mariachi hat`,
];

const DiscoBanditCloaks: Item[] = [
  $item`Misty Cape`,
];

const DiscoBanditShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
  $item`eXtreme Bi-Polar Fleece Vest`,
];

const DiscoBanditWeapons: Item[] = [
  $item`novelty sparkling candle`,
  $item`pygmy concertinette`,
  $item`accord ion`,
  $item`disco ball`,
  $item`stolen accordion`,
];

const DiscoBanditOffhands: Item[] = [
  $item`autumn debris shield`,
  $item`orcish stud-finder`,
  $item`hot plate`,
];

const DiscoBanditPants: Item[] = [
  $item`ninja hot pants`,
  $item`Knob Goblin elite pants`,
  $item`old sweatpants`,
];

const DiscoBanditAccessories: Item[] = [
  $item`astral mask`,
  $item`World's Best Adventurer sash`,
  $item`Nickel Gamma of Frugality`,
  $item`blackberry galoshes`,
  $item`badass belt`,
  $item`batskin belt`,
  $item`shiny ring`,
  $item`ghost of a necklace`,
  $item`imp unity ring`,
  $item`dirty hobo gloves`,
];

const DiscoBanditFamiliar: Item[] = [
  $item`astral pet sweater`,
];
