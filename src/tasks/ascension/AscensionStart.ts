import { adv1, autosell, buy, Class, cliExecute, eat, getProperty, Item, itemAmount, Location, myClass, myMeat, myPrimestat, runChoice, use, visitUrl } from "kolmafia";
import { $item, $location, $stat } from "libram";
import { AdventureInfo } from "../../lib/AdventureInfo";
import { Properties } from "../../Properties";
import { Task } from "../Task";

export const AscensionStartTask: Task = {
  name: "Start of ascension",
  subtasks: [
    {
      name: "Toot Oriole",
      available: () => getProperty(TootOrioleQuestProperty) === "started",
      progress: () => { visitUrl("tutorial.php?action=toot"); },
      completed: () => getProperty(TootOrioleQuestProperty) === "finished",
    },
    {
      name: "Read King Ralph's letter",
      available: () => itemAmount($item`letter from King Ralph XI`) > 0,
      progress: () => { use(1, $item`letter from King Ralph XI`); },
      completed: () => getProperty(TootOrioleQuestProperty) === "finished" && 
        itemAmount($item`letter from King Ralph XI`) < 1,
    },
    {
      name: "Sell pork elf goodies",
      available: () => itemAmount($item`pork elf goodies sack`) > 0,
      progress: () => sellPorkElfGoodies(),
      completed: () => getProperty(TootOrioleQuestProperty) === "finished" && 
        itemAmount($item`letter from King Ralph XI`) < 1 && 
        itemAmount($item`pork elf goodies sack`) < 1,
    },
    {
      name: "Buy antique accordion",
      available: () => myClass() != Class.get("Accordion Thief") && itemAmount($item`antique accordion`) < 1 && myMeat() >= 2500,
      progress: () => { cliExecute("/buy antique accordion"); },
      completed: () => itemAmount($item`antique accordion`) > 0,
    },
    {
      name: "Acquire saucepan",
      available: () => itemAmount($item`saucepan`) < 1 && myMeat() >= 1000,
      progress: () => getChewinggumItem($item`saucepan`),
      completed: () => itemAmount($item`saucepan`) > 0,
    },
    {
      name: "Deploy tent",
      available: () => itemAmount($item`newbiesport&trade; tent`) > 0,
      progress: () => { use(1, $item`newbiesport&trade; tent`); },
      completed: () => itemAmount($item`newbiesport&trade; tent`) < 1,
    },
    {
      name: "Start Doc Galaktik's quest",
      available: () => getProperty(DocGalaktikQuestProperty) === "unstarted",
      progress: () => startDocGalaktik(),
      completed: () => getProperty(DocGalaktikQuestProperty) === "started",
    },
    {
      name: "Deploy shinies",
      available: () => !shiniesDeployed(),
      progress: () => deployShinies(),
      completed: () => shiniesDeployed(),
    },
    {
      name: "Eat a hotdog",
      available: () => itemAmount($item`astral hot dog`) === 3,
      progress: () => { eat(1, $item`astral hot dog`); },
      completed: () => itemAmount($item`astral hot dog`) < 3,
    },
  ],
};

export const UnlockGuildTask: Task = {
  name: "Unlock class guild",
  subtasks: [
    {
      name: "Unlock class guild",
      available: () => !guildQuestDone(),
      progress: () => doGuildQuest(),
      completed: () => guildQuestDone(),
      delay: {
        location: guildQuestLocation(),
        turns: 5,
        property: Properties.Ascension.Delay.GuildQuest,
      },
    },
  ],
};

const TootOrioleQuestProperty = "questM05Toot";
const DocGalaktikQuestProperty = "questM24Doc";

function sellPorkElfGoodies() {
  use(1, $item`pork elf goodies sack`);

  Item.get(["hamethyst", "baconstone", "porquoise"]).forEach(item => {
    autosell(itemAmount(item), item);
  });
}

function startDocGalaktik() {
  visitUrl("shop.php?whichshop=doc");
  visitUrl("shop.php?whichshop=doc&action=talk");
  runChoice(1);
  adv1(Location.get("The Overgrown Lot"));
}

const MyShinies = Item.get([
  "astral hot dog dinner",
  "model train set",
]);

function shiniesDeployed(): boolean {
  let result = true;

  MyShinies.forEach(shiny => {
    result = result && itemAmount(shiny) < 1;
  });

  return result;
}

function deployShinies() {
  MyShinies.forEach(shiny => use(1, shiny));

  // Visit workshed to refresh kolmafia trainset properties
  visitUrl("campground.php?action=workshed");
}

function getChewinggumItem(item: Item) {
  while (itemAmount(item) < 1) {
    if (itemAmount($item`chewing gum on a string`) < 1 && !buy(1, $item`chewing gum on a string`)) {
      throw new Error("Unable to buy chewing gum on a string");
    }

    if (!use(1, $item`chewing gum on a string`)) {
      throw new Error("Unable to use chewing gum on a string");
    }
  }
}

function guildQuestDone(): boolean {
  return getProperty(guildQuestProperty()) === "finished";
}

function doGuildQuest(): AdventureInfo | void {
  if (getProperty(guildQuestProperty()) === "unstarted") {
    visitUrl("guild.php?place=challenge");
  }

  if (getProperty(guildQuestProperty()) === "started") {
    return {
      location: guildQuestLocation(),
      modifiers: [],
    };
  }

  if (getProperty(guildQuestProperty()) === "step1") {
    visitUrl("guild.php?place=challenge");
  }
}

function guildQuestProperty(): string {
  switch (myPrimestat()) {
    case $stat`Muscle`:
      return "questG09Muscle";
    case $stat`Mysticality`:
      return "questG07Myst";
    case $stat`Moxie`:
      return "questG08Moxie";
  }

  throw new Error("Unknown guild quest");
}

function guildQuestLocation(): Location {
  switch (myPrimestat()) {
    case $stat`Muscle`:
      return $location`The Outskirts of Cobb's Knob`;
    case $stat`Mysticality`:
      return $location`The Haunted Pantry`;
    case $stat`Moxie`:
      return $location`The Sleazy Back Alley`;
  }

  throw new Error("Unknown guild quest location");
}
