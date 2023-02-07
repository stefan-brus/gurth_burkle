import { drink, getProperty, inebrietyLimit, Item, itemAmount, toInt, visitUrl } from "kolmafia";
import { $item, $location } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Modifier } from "../../lib/Modifier";
import { Task } from "../Task";

export const AzazelTask: Task = {
  name: "Azazel's Quest",
  subtasks: [
    {
      name: "Talk to Pandemonium people",
      available: () => getProperty("questL06Friar") === "finished" && getProperty(AzazelQuestProperty) === "unstarted",
      progress: () => startAzazel(),
      completed: () => getProperty(AzazelQuestProperty) !== "unstarted",
    },
    {
      name: "Get Azazel's lollipop",
      available: () => getProperty(AzazelQuestProperty) === "started",
      progress: () => azazelLollipop(),
      completed: () => itemAmount($item`Azazel's lollipop`) > 0,
    },
    {
      name: "Get Azazel's unicorn",
      available: () => getProperty(AzazelQuestProperty) === "started",
      progress: () => azazelUnicorn(),
      completed: () => itemAmount($item`Azazel's unicorn`) > 0,
    },
    {
      name: "Get Azazel's tutu",
      available: () => getProperty(AzazelQuestProperty) === "started" && itemAmount($item`imp air`) >= 5 && itemAmount($item`bus pass`) >= 5,
      progress: () => azazelTutu(),
      completed: () => itemAmount($item`Azazel's tutu`) > 0,
    },
    {
      name: "Return to Azazel",
      available: () => itemAmount($item`Azazel's lollipop`) > 0 && itemAmount($item`Azazel's unicorn`) > 0 && itemAmount($item`Azazel's tutu`) > 0,
      progress: () => { visitUrl("pandamonium.php?action=temp"); },
      completed: () => getProperty(AzazelQuestProperty) === "finished",
    },
    {
      name: "Drink steel margarita",
      available: () => inebrietyLimit() < 19 && itemAmount($item`steel margarita`) > 0,
      progress: () => { drink(1, $item`steel margarita`); },
      completed: () => inebrietyLimit() >= 19,
    },
  ],
};

const AzazelQuestProperty = "questM10Azazel";

function startAzazel() {
  visitUrl("pandamonium.php?action=moan");
  visitUrl("pandamonium.php?action=infe");
  visitUrl("pandamonium.php?action=sven");
  visitUrl("pandamonium.php?action=sven");
  visitUrl("pandamonium.php?action=beli");
  visitUrl("pandamonium.php?action=mourn");
  visitUrl("pandamonium.php?action=moan");
}

function azazelLollipop(): AdventureInfo | void {
  if (itemAmount($item`observational glasses`) < 1) {
    return {
      location: $location`The Laugh Floor`,
      modifiers: [Modifier.Combat],
    };
  }

  visitUrl("pandamonium.php?action=mourn&whichitem=" + toInt($item`observational glasses`) + "&pwd");
}

function azazelUnicorn(): AdventureInfo | void {
  function enoughItems(): boolean {
    function enoughBognortStinkface(): boolean {
      const haveMarshmallow = itemAmount($item`giant marshmallow`) > 0;
      const haveTeddybear = itemAmount($item`beer-scented teddy bear`) > 0;
      const havePaper = itemAmount($item`gin-soaked blotter paper`) > 0;

      return (haveMarshmallow && haveTeddybear) || (havePaper && (haveMarshmallow || haveTeddybear));
    }

    function enoughFlargwurmJim(): boolean {
      const haveCherry = itemAmount($item`booze-soaked cherry`) > 0;
      const havePillow = itemAmount($item`comfy pillow`) > 0;
      const haveCake = itemAmount($item`sponge cake`) > 0;

      return (haveCherry && havePillow) || (haveCake && (haveCherry || havePillow));
    }

    return enoughBognortStinkface() && enoughFlargwurmJim();
  }

  if (!enoughItems()) {
    return {
      location: $location`Infernal Rackets Backstage`,
      modifiers: [Modifier.NonCombat],
    };
  }

  let bognortDone = false;
  let stinkfaceDone = false;
  let flargwurmDone = false;
  let jimDone = false;

  // Give more specific items first
  if (itemAmount($item`giant marshmallow`) > 0) {
    giveSven("Bognort", $item`giant marshmallow`);
    bognortDone = true;
  }
  if (itemAmount($item`beer-scented teddy bear`) > 0) {
    giveSven("Stinkface", $item`beer-scented teddy bear`);
    stinkfaceDone = true;
  }
  if (itemAmount($item`booze-soaked cherry`) > 0) {
    giveSven("Flargwurm", $item`booze-soaked cherry`);
    flargwurmDone = true;
  }
  if (itemAmount($item`comfy pillow`) > 0) {
    giveSven("Jim", $item`comfy pillow`);
    jimDone = true;
  }

  // Then items that cover multiple band members
  if (itemAmount($item`gin-soaked blotter paper`) > 0) {
    if (!bognortDone) {
      giveSven("Bognort", $item`gin-soaked blotter paper`);
    }
    else if (!stinkfaceDone) {
      giveSven("Stinkface", $item`gin-soaked blotter paper`);
    }
  }
  if (itemAmount($item`sponge cake`) > 0) {
    if (!flargwurmDone) {
      giveSven("Flargwurm", $item`sponge cake`);
    }
    else if (!jimDone) {
      giveSven("Jim", $item`sponge cake`);
    }
  }
}

function azazelTutu() {
  // Assume that fallbot has collected the imp airs and bus passes
  visitUrl("pandamonium.php?action=moan");
}

function giveSven(bandMember: string, item: Item) {
  visitUrl("pandamonium.php?action=sven");
  visitUrl(`pandamonium.php?action=sven&bandmember=${bandMember}&togive=${toInt(item)}&preaction=try`);
}
