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
  );
}

const TurtleTamerHats: Item[] = [
  $item`Crown of the Goblin King`,
  $item`Knob Goblin elite helm`,
  $item`chef's hat`,
  $item`helmet turtle`,
];

const TurtleTamerCloaks: Item[] = [
  $item`whatsit-covered turtle shell`,
];

const TurtleTamerShirts: Item[] = [
  $item`autumn sweater-weather sweater`,
];

const TurtleTamerWeapons: Item[] = [
  $item`Knob Goblin scimitar`,
  $item`turtle totem`,
];

const TurtleTamerOffhands: Item[] = [
  $item`autumn debris shield`,
  $item`white satin shield`,
  $item`hot plate`,
];

const TurtleTamerPants: Item[] = [
  $item`ninja hotpants`,
  $item`Knob Goblin elite pants`,
  $item`Knob Goblin pants`,
  $item`old sweatpants`,
];

const TurtleTamerAccessories: Item[] = [
  $item`badass belt`,
  $item`batskin belt`,
  $item`shiny ring`,
  $item`imp unity ring`,
];
