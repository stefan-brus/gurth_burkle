import { create, equip, getProperty, haveEffect, haveSkill, Item, itemAmount, myAdventures, runChoice, runCombat, setProperty, use, useSkill, visitUrl } from "kolmafia";
import { $effect, $item, $location, $skill, $slot } from "libram";
import { Constants } from "../../../Constants";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { Modifier } from "../../../lib/Modifier";
import { Task } from "../../Task";

export const L11PalindomeTask: Task = {
  name: "L11: Palindome",
  subtasks: [
    {
      name: "Get photographs",
      available: () => getProperty(L11PalindomeProperty) === "started",
      progress: () => getPhotographs(),
      completed: () => itemAmount($item`photograph of God`) > 0 &&
                       itemAmount($item`photograph of a red nugget`) > 0 &&
                       itemAmount($item`photograph of a dog`) > 0 &&
                       itemAmount($item`photograph of an ostrich egg`) > 0,
      spikesTask: true,
    },
    {
      name: "Get I Love Me, Vol. I",
      available: () => getProperty(L11PalindomeProperty) === "started",
      progress: () => { return { location: $location`Inside the Palindome`, modifiers: [] }; },
      completed: () => itemAmount(LoveVol1Item) > 0,
    },
    {
      name: "Arrange photos",
      available: () => itemAmount($item`photograph of God`) > 0 &&
                       itemAmount($item`photograph of a red nugget`) > 0 &&
                       itemAmount($item`photograph of a dog`) > 0 &&
                       itemAmount($item`photograph of an ostrich egg`) > 0 &&
                       itemAmount(LoveVol1Item) > 0,
      progress: () => arrangePhotos(),
      completed: () => getProperty(L11PalindomeProperty) === "step1",
    },
    {
      name: "Read 2 Love Me, Vol. 2",
      available: () => getProperty(L11PalindomeProperty) === "step1",
      progress: () => { use(1, LoveVol2Item); },
      completed: () => getProperty(L11PalindomeProperty) !== "step1",
    },
    {
      name: "Visit Mr. Alarm",
      available: () => getProperty(L11PalindomeProperty) === "step2",
      progress: () => { equip($slot`acc3`, TalismanItem); visitUrl("place.php?whichplace=palindome&action=pal_mroffice"); },
      completed: () => getProperty(L11PalindomeProperty) !== "step2",
    },
    {
      name: "Get stunt nuts",
      available: () => getProperty(L11PalindomeProperty) === "step3" && itemAmount($item`stunt nuts`) < 1,
      progress: () => { return { location: $location`Inside the Palindome`, modifiers: [] }; },
      completed: () => itemAmount($item`stunt nuts`) > 0,
    },
    {
      name: "Create wet stunt nut stew",
      available: () => getProperty(L11PalindomeProperty) === "step3" &&
                       itemAmount($item`stunt nuts`) > 0 &&
                       itemAmount($item`lion oil`) > 0 &&
                       itemAmount($item`stunt nuts`) > 0,
      progress: () => { create(1, $item`wet stunt nut stew`); },
      completed: () => getProperty(L11PalindomeProperty) !== "step3",
    },
    {
      name: "Return to Mr. Alarm",
      available: () => getProperty(L11PalindomeProperty) === "step4",
      progress: () => { equip($slot`acc3`, TalismanItem); visitUrl("place.php?whichplace=palindome&action=pal_mrlabel"); },
      completed: () => getProperty(L11PalindomeProperty) !== "step4",
    },
    {
      name: "Kill Dr. Awkward",
      available: () => getProperty(L11PalindomeProperty) === "step5" && myAdventures() > (1 + Constants.ReservedAdventures),
      progress: () => killDrAwkward(),
      completed: () => getProperty(L11PalindomeProperty) === "finished",
    },
  ],
};

const L11PalindomeProperty = "questL11Palindome";

const TalismanItem = $item`Talisman o' Namsilat`;
const LoveVol1Item = Item.get(7262);
const LoveVol2Item = Item.get(7270);

function getPhotographs(): AdventureInfo {
  const PhotoGodChoice = "choiceAdventure129";
  const PhotoNuggetChoice = "choiceAdventure873";

  setProperty(PhotoGodChoice, "1");
  setProperty(PhotoNuggetChoice, "1");

  return {
    location: $location`Inside the Palindome`,
    modifiers: [Modifier.NonCombat],
  };
}

function arrangePhotos() {
  use(1, LoveVol1Item);
  visitUrl("place.php?whichplace=palindome&action=pal_droffice");
  visitUrl("choice.php?whichchoice=872&option=1&photo1=2259&photo2=7264&photo3=7263&photo4=7265&pwd");

  if (haveEffect($effect`Beaten Up`) > 0 && haveSkill($skill`Tongue of the Walrus`)) {
    useSkill(1, $skill`Tongue of the Walrus`);
  }
}

function killDrAwkward() {
  equip($slot`acc2`, $item`Mega Gem`);
  equip($slot`acc3`, TalismanItem);

  visitUrl("place.php?whichplace=palindome&action=pal_drlabel");
  runChoice(1);
  runCombat();
}
