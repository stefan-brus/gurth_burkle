import { Item, availableAmount, canAdventure, getProperty, itemAmount, runChoice, userConfirm, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { Config } from "../Config";
import { gnasirWants } from "../lib/Gnasir";
import { tavernUnlocked } from "../tasks/ascension/L11Macguffin/HiddenCity";
import { Properties } from "../Properties";

export function monkeyPawRemainingWishes(): number {
  return 5 - parseInt(getProperty(MonkeyPawWishesProperty));
}

export function useUpWishes(count: number) {
  if (count > monkeyPawRemainingWishes()) {
    throw new Error(`Can't use ${count} wishes, only ${monkeyPawRemainingWishes()} left`);
  }

  while (count > 0) {
    let wishUsed = false;
    for (const wish of WishList) {
      if (Config.PromptPaw && !userConfirm("Use monkey's paw to wish for " + wish.item.name + "?"))
        throw new Error("User aborted on monkey's paw wish");

      if (wish.canWish() && wish.shouldWish()) {
        useWish(wish.item.name);
        wishUsed = true;
        break;
      }
    }

    if (wishUsed) {
      count--;
    }
    else {
      break;
    }
  }
}

function useWish(wish: string) {
  visitUrl("main.php?action=cmonk&pwd");
  runChoice(1, `wish=${wish}`);
  visitUrl("main.php");
}

const MonkeyPawWishesProperty = "_monkeyPawWishesUsed";

type ShouldWishInfo = {
  item: Item,
  canWish: () => boolean,
  shouldWish: () => boolean,
};

const WishList: ShouldWishInfo[] = [
  {
    item: $item`imp air`,
    canWish: () => canAdventure($location`The Laugh Floor`),
    shouldWish: () => itemAmount($item`imp air`) < 5 && Config.TaskAzazel && getProperty("questM10Azazel") !== "finished" && itemAmount($item`Azazel's tutu`) < 1,
  },
  {
    item: $item`bus pass`,
    canWish: () => canAdventure($location`Infernal Rackets Backstage`),
    shouldWish: () => itemAmount($item`bus pass`) < 5 && Config.TaskAzazel && getProperty("questM10Azazel") !== "finished" && itemAmount($item`Azazel's tutu`) < 1,
  },
  {
    item: $item`enchanted bean`,
    canWish: () => canAdventure($location`The Beanbat Chamber`),
    shouldWish: () => itemAmount($item`enchanted bean`) < 1 && (getProperty("questL10Garbage") === "unstarted" || getProperty("questL10Garbage") === "started"),
  },
  {
    item: $item`sonar-in-a-biscuit`,
    canWish: () => canAdventure($location`Guano Junction`),
    shouldWish: () => itemAmount($item`sonar-in-a-biscuit`) < 1 && ["started", "step1", "step2"].some(val => val === getProperty("questL04Bat")),
  },
  {
    item: $item`goat cheese`,
    canWish: () => canAdventure($location`The Goatlet`),
    shouldWish: () => itemAmount($item`goat cheese`) < 3 && getProperty("questL08Trapper") === "started" || getProperty("questL08Trapper") === "step1",
  },
  {
    item: $item`eXtreme scarf`,
    canWish: () => canAdventure($location`The eXtreme Slope`),
    shouldWish: () => availableAmount($item`eXtreme scarf`) < 1,
  },
  {
    item: $item`snowboarder pants`,
    canWish: () => canAdventure($location`The eXtreme Slope`),
    shouldWish: () => availableAmount($item`snowboarder pants`) < 1,
  },
  {
    item: $item`eXtreme mittens`,
    canWish: () => canAdventure($location`The eXtreme Slope`),
    shouldWish: () => availableAmount($item`eXtreme mittens`) < 1,
  },
  {
    item: $item`rusty hedge trimmers`,
    canWish: () => canAdventure($location`Twin Peak`),
    shouldWish: () => itemAmount($item`rusty hedge trimmers`) < 1 && parseInt(getProperty("twinPeakProgress")) !== 15,
  },
  {
    item: $item`mohawk wig`,
    canWish: () => canAdventure($location`The Penultimate Fantasy Airship`),
    shouldWish: () => availableAmount($item`mohawk wig`) < 1 && getProperty("questL10Garbage") !== "finished",
  },
  {
    item: $item`amulet of extreme plot significance`,
    canWish: () => canAdventure($location`The Penultimate Fantasy Airship`),
    shouldWish: () => availableAmount($item`amulet of extreme plot significance`) < 1 && getProperty("questL10Garbage") !== "finished",
  },
  {
    item: $item`killing jar`,
    canWish: () => canAdventure($location`The Haunted Library`),
    shouldWish: () => itemAmount($item`killing jar`) < 1 && gnasirWants($item`killing jar`),
  },
  {
    item: $item`stone wool`,
    canWish: () => canAdventure($location`The Hidden Temple`),
    shouldWish: () => (getProperty("questL11Worship") === "step1" && itemAmount($item`stone wool`) < 2) || (getProperty("questL11Worship") === "step2" && itemAmount($item`stone wool`) < 1),
  },
  {
    item: $item`book of matches`,
    canWish: () => canAdventure($location`The Hidden Park`),
    shouldWish: () => !tavernUnlocked() && itemAmount($item`book of matches`) < 1,
  },
  {
    item: $item`half-size scalpel`,
    canWish: () => canAdventure($location`The Hidden Hospital`),
    shouldWish: () => parseInt(getProperty("hiddenHospitalProgress")) !== 8 && availableAmount($item`half-size scalpel`) < 1,
  },
  {
    item: $item`head mirror`,
    canWish: () => canAdventure($location`The Hidden Hospital`),
    shouldWish: () => parseInt(getProperty("hiddenHospitalProgress")) !== 8 && availableAmount($item`head mirror`) < 1,
  },
  {
    item: $item`surgical mask`,
    canWish: () => canAdventure($location`The Hidden Hospital`),
    shouldWish: () => parseInt(getProperty("hiddenHospitalProgress")) !== 8 && availableAmount($item`surgical mask`) < 1,
  },
  {
    item: $item`surgical apron`,
    canWish: () => canAdventure($location`The Hidden Hospital`),
    shouldWish: () => parseInt(getProperty("hiddenHospitalProgress")) !== 8 && availableAmount($item`surgical apron`) < 1,
  },
  {
    item: $item`bloodied surgical dungarees`,
    canWish: () => canAdventure($location`The Hidden Hospital`),
    shouldWish: () => parseInt(getProperty("hiddenHospitalProgress")) !== 8 && availableAmount($item`bloodied surgical dungarees`) < 1,
  },
  {
    item: $item`bowling ball`,
    canWish: () => canAdventure($location`The Hidden Bowling Alley`),
    shouldWish: () => itemAmount($item`bowling ball`) < 3 && parseInt(getProperty("hiddenBowlingAlleyProgress")) !== 8
  },
  {
    item: $item`crappy waiter disguise`,
    canWish: () => canAdventure($location`The Copperhead Club`),
    shouldWish: () => itemAmount($item`crappy waiter disguise`) < 1 && getProperty("questL11Shen") !== "finished",
  },
  {
    item: $item`drum machine`,
    canWish: () => canAdventure($location`The Arid, Extra-Dry Desert`),
    shouldWish: () => itemAmount($item`drum machine`) < 1 && gnasirWants($item`drum machine`),
  },
  {
    item: $item`cigarette lighter`,
    canWish: () => canAdventure($location`A Mob of Zeppelin Protesters`),
    shouldWish: () => itemAmount($item`cigarette lighter`) < 1 && getProperty("questL11Ron") === "started" || getProperty("questL11Ron") === "step1",
  },
  {
    item: $item`glark cable`,
    canWish: () => canAdventure($location`The Red Zeppelin`),
    shouldWish: () => itemAmount($item`glark cable`) < 1 && getProperty("questL11Ron") !== "finished",
  },
  {
    item: $item`lion oil`,
    canWish: () => canAdventure($location`Whitey's Grove`),
    shouldWish: () => itemAmount($item`lion oil`) < 1 && itemAmount($item`wet stunt nut stew`) < 1 && !["step4", "step5", "finished"].some(val => val === getProperty("questL11Palindome")),
  },
  {
    item: $item`bird rib`,
    canWish: () => canAdventure($location`Whitey's Grove`),
    shouldWish: () => itemAmount($item`bird rib`) < 1 && itemAmount($item`wet stunt nut stew`) < 1 && !["step4", "step5", "finished"].some(val => val === getProperty("questL11Palindome")),
  },
  {
    item: $item`stunt nuts`,
    canWish: () => canAdventure($location`The Palindome`),
    shouldWish: () => itemAmount($item`stunt nuts`) < 1 && itemAmount($item`wet stunt nut stew`) < 1 && !["step4", "step5", "finished"].some(val => val === getProperty("questL11Palindome")),
  },
  {
    item: $item`tomb ratchet`,
    canWish: () => canAdventure($location`The Middle Chamber`),
    shouldWish: () => getProperty(Properties.Ascension.PyramidWheelsGathered) !== "true",
  },
  {
    item: $item`lowercase N`,
    canWish: () => canAdventure($location`The Valley of Rof L'm Fao`),
    shouldWish: () => itemAmount($item`lowercase N`) < 1 && availableAmount($item`Wand of Nagamar`) < 1,
  },
  {
    item: $item`star chart`,
    canWish: () => canAdventure($location`The Hole in the Sky`),
    shouldWish: () => !getProperty("nsTowerDoorKeysUsed").includes("Richard's star key") && itemAmount($item`Richard's star key`) < 1 && itemAmount($item`star chart`) < 1,
  },
  {
    item: $item`star`,
    canWish: () => canAdventure($location`The Hole in the Sky`),
    shouldWish: () => !getProperty("nsTowerDoorKeysUsed").includes("Richard's star key") && itemAmount($item`Richard's star key`) < 1 && itemAmount($item`star`) < 8,
  },
  {
    item: $item`line`,
    canWish: () => canAdventure($location`The Hole in the Sky`),
    shouldWish: () => !getProperty("nsTowerDoorKeysUsed").includes("Richard's star key") && itemAmount($item`Richard's star key`) < 1 && itemAmount($item`line`) < 7,
  },
];
