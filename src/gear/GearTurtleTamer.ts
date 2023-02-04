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
];

const TurtleTamerPants: Item[] = [
  $item`Knob Goblin pants`,
  $item`old sweatpants`,
];

const TurtleTamerAccessories: Item[] = [
  $item`batskin belt`,
  $item`shiny ring`,
];
