import { buy, canAdventure, cliExecute, equippedAmount, getProperty, haveEffect, itemAmount, Location, myAdventures, myHash, setProperty, use, visitUrl } from "kolmafia";
import { $effect, $item, $location } from "libram";
import { Constants } from "../../../Constants";
import { AdventureInfo } from "../../../lib/AdventureInfo";
import { Modifier } from "../../../lib/Modifier";
import { Task } from "../../Task";

export const L11HiddenTempleTask: Task = {
  name: "L11: Hidden Temple",
  subtasks: [
    {
      name: "Get the Nostril of the Serpent",
      available: () => (getProperty(L11HiddenCityProperty) === "step1" || getProperty(L11HiddenCityProperty) === "step2") && 
                       itemAmount($item`stone wool`) > 0 &&
                       itemAmount($item`the Nostril of the Serpent`) < 1,
      progress: () => getNostril(),
      completed: () => (getProperty(L11HiddenCityProperty) !== "step1" && getProperty(L11HiddenCityProperty) !== "step2") || itemAmount($item`the Nostril of the Serpent`) > 0,
    },
    {
      name: "Unlock The Hidden City",
      available: () => (getProperty(L11HiddenCityProperty) === "step1" || getProperty(L11HiddenCityProperty) === "step2") && 
                       itemAmount($item`stone wool`) > 0 &&
                       itemAmount($item`the Nostril of the Serpent`) > 0 &&
                       myAdventures() >= 4 + Constants.ReservedAdventures,
      progress: () => unlockHiddenCity(),
      completed: () => getProperty(L11HiddenCityProperty) !== "step1" && getProperty(L11HiddenCityProperty) !== "step2",
    },
  ],
};

export const L11HiddenCityTask: Task = {
  name: "L11: Hidden City",
  subtasks: [
    {
      name: "Get antique machete",
      available: () => getProperty(L11HiddenCityProperty) === "step3",
      progress: () => doHiddenPark(),
      completed: () => itemAmount($item`antique machete`) > 0 || equippedAmount($item`antique machete`) > 0,
    },
    {
      name: "Relocate pygmy janitors",
      available: () => getProperty(L11HiddenCityProperty) === "step3",
      progress: () => doHiddenPark(),
      completed: () => parseInt(getProperty(JanitorProperty)) === parseInt(getProperty("knownAscensions")),
    },
    {
      name: "Unlock The Hidden Tavern",
      available: () => parseInt(getProperty(JanitorProperty)) === parseInt(getProperty("knownAscensions")),
      progress: () => doHiddenPark(),
      completed: () => tavernUnlocked(),
    },
    {
      name: "Unlock The Hidden Apartment Building",
      available: () => itemAmount($item`antique machete`) > 0 || equippedAmount($item`antique machete`) > 0,
      progress: () => clearVines($location`An Overgrown Shrine (Northwest)`),
      completed: () => canAdventure($location`The Hidden Apartment Building`),
      spikesTask: true,
    },
    {
      name: "Unlock The Hidden Office Building",
      available: () => itemAmount($item`antique machete`) > 0 || equippedAmount($item`antique machete`) > 0,
      progress: () => clearVines($location`An Overgrown Shrine (Northeast)`),
      completed: () => canAdventure($location`The Hidden Office Building`),
      spikesTask: true,
    },
    {
      name: "Unlock The Hidden Hospital",
      available: () => itemAmount($item`antique machete`) > 0 || equippedAmount($item`antique machete`) > 0,
      progress: () => clearVines($location`An Overgrown Shrine (Southwest)`),
      completed: () => canAdventure($location`The Hidden Hospital`),
    },
    {
      name: "Unlock The Hidden Bowling Alley",
      available: () => itemAmount($item`antique machete`) > 0 || equippedAmount($item`antique machete`) > 0,
      progress: () => clearVines($location`An Overgrown Shrine (Southeast)`),
      completed: () => canAdventure($location`The Hidden Bowling Alley`),
    },
    {
      name: "Clear the ziggurat",
      available: () => itemAmount($item`antique machete`) > 0 || equippedAmount($item`antique machete`) > 0,
      progress: () => clearVines($location`A Massive Ziggurat`),
      completed: () => parseInt(getProperty(ZigguratProperty)) === 1,
    },
    {
      name: "Do The Hidden Apartment Building",
      available: () => canAdventure($location`The Hidden Apartment Building`),
      progress: () => doApartmentBuilding(),
      completed: () => parseInt(getProperty(ApartmentBuildingProperty)) === 8 && parseInt(getProperty(LawyerProperty)) === parseInt(getProperty("knownAscensions")),
    },
    {
      name: "Do The Hidden Office Building",
      available: () => canAdventure($location`The Hidden Office Building`),
      progress: () => doOfficeBuilding(),
      completed: () => parseInt(getProperty(OfficeBuildingProperty)) === 8,
      spikesTask: true,
    },
    {
      name: "Do The Hidden Hospital",
      available: () => canAdventure($location`The Hidden Hospital`),
      progress: () => doHospital(),
      completed: () => parseInt(getProperty(HospitalProperty)) === 8,
      spikesTask: true,
    },
    {
      name: "Do The Hidden Bowling Alley",
      available: () => canAdventure($location`The Hidden Bowling Alley`),
      progress: () => doBowlingAlley(),
      completed: () => parseInt(getProperty(BowlingAlleyProperty)) === 8,
      spikesTask: true,
    },
    {
      name: "Get ancient amulet",
      available: () => getProperty(L11HiddenCityProperty) === "step4",
      progress: () => getAncientAmulet(),
      completed: () => getProperty(L11HiddenCityProperty) === "finished",
    },
  ],
};

const L11HiddenCityProperty = "questL11Worship";
const JanitorProperty = "relocatePygmyJanitor";
const LawyerProperty = "relocatePygmyLawyer";
const TavernProperty = "hiddenTavernUnlock";
const ZigguratProperty = "zigguratLianas";
const ApartmentBuildingProperty = "hiddenApartmentProgress";
const OfficeBuildingProperty = "hiddenOfficeProgress";
const HospitalProperty = "hiddenHospitalProgress";
const BowlingAlleyProperty = "hiddenBowlingAlleyProgress";

function getNostril(): AdventureInfo {
  const StoneWoolChoice = "choiceAdventure582";
  const HeightsChoice = "choiceAdventure579";
  
  setProperty(StoneWoolChoice, "1");
  setProperty(HeightsChoice, "2");

  if (itemAmount($item`stone wool`) > 0) {
    use(1, $item`stone wool`);
  }

  return {
    location: $location`The Hidden Temple`,
    modifiers: [Modifier.NonCombat],
  };
}

function unlockHiddenCity() {
  // Mafia has some trouble with the choice adventures here, so we do the whole sequence manually
  // 1 stone wool is assumed
  if (itemAmount($item`stone wool`) < 1 || !use(1, $item`stone wool`)) {
    throw new Error("Unable to use stone wool for hidden city unlock");
  }

  visitUrl("adventure.php?snarfblat=280");
  visitUrl("choice.php?whichchoice=582&option=2&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=580&option=2&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=584&option=4&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=580&option=1&pwd=" + myHash());
  visitUrl("choice.php?whichchoice=123&option=2&pwd=" + myHash());
  visitUrl("choice.php?");
  cliExecute("dvorak");
  visitUrl("choice.php?whichchoice=125&option=3&pwd=" + myHash());
}

function tavernUnlocked(): boolean {
  return parseInt(getProperty(TavernProperty)) === parseInt(getProperty("knownAscensions"));
}

function doHiddenPark(): AdventureInfo | void {
  const DumpsterChoice = "choiceAdventure789";

  if (parseInt(getProperty(JanitorProperty)) === parseInt(getProperty("knownAscensions"))) {
    setProperty(DumpsterChoice, "1");
  }
  else {
    setProperty(DumpsterChoice, "2");
  }

  if (!tavernUnlocked() && itemAmount($item`book of matches`) > 0) {
    use(1, $item`book of matches`);
    return;
  }

  return {
    location: $location`The Hidden Park`,
    modifiers: [Modifier.NonCombat],
  };
}

function clearVines(loc: Location): AdventureInfo {
  const NWShrineChoice = "choiceAdventure781";
  const NEShrineChoice = "choiceAdventure785";
  const SWShrineChoice = "choiceAdventure783";
  const SEShrinceChoice = "choiceAdventure787";

  const ExpectedNCs = new Map<Location, string>([
    [$location`An Overgrown Shrine (Northwest)`, "Earthbound and Down"],
    [$location`An Overgrown Shrine (Northeast)`, "Air Apparent"],
    [$location`An Overgrown Shrine (Southwest)`, "Water You Dune"],
    [$location`An Overgrown Shrine (Southeast)`, "Fire When Ready"],
    [$location`A Massive Ziggurat`, "Legend of the Temple in the Hidden City"],
  ]);

  setProperty(NWShrineChoice, "1");
  setProperty(NEShrineChoice, "1");
  setProperty(SWShrineChoice, "1");
  setProperty(SEShrinceChoice, "1");

  return {
    location: loc,
    modifiers: [],
    expectedNoncombat: ExpectedNCs.get(loc),
  };
}

function doApartmentBuilding(): AdventureInfo {
  const ApartmentChoice = "choiceAdventure780";

  if (parseInt(getProperty(LawyerProperty)) < parseInt(getProperty("knownAscensions"))) {
    setProperty(ApartmentChoice, "3");
  }
  else if (haveEffect($effect`Thrice-Cursed`) < 1) {
    setProperty(ApartmentChoice, "2");
  }
  else {
    setProperty(ApartmentChoice, "1");
  }

  if (itemAmount($item`moss-covered stone sphere`) < 1) {
    return {
      location: $location`The Hidden Apartment Building`,
      modifiers: [Modifier.NonCombat],
    };
  }
  else {
    if (haveEffect($effect`Thrice-Cursed`) > 0) {
      cliExecute("uneffect Thrice-Cursed");
    }

    return {
      location: $location`An Overgrown Shrine (Northwest)`,
      modifiers: [],
      expectedNoncombat: "Earthbound and Down",
    };
  }
}

function doOfficeBuilding(): AdventureInfo {
  const OfficeChoice = "choiceAdventure786";

  if (itemAmount($item`McClusky file (complete)`) < 1) {
    if (itemAmount($item`boring binder clip`) < 1) {
      setProperty(OfficeChoice, "2");
    }
    else {
      setProperty(OfficeBuildingProperty, "3");
    }
  }
  else {
    setProperty(OfficeChoice, "1");
  }

  if (itemAmount($item`crackling stone sphere`) < 1) {
    return {
      location: $location`The Hidden Office Building`,
      modifiers: [Modifier.NonCombat],
    };
  }
  else {
    return {
      location: $location`An Overgrown Shrine (Northeast)`,
      modifiers: [],
      expectedNoncombat: "Air Apparent",
    };
  }
}

function doHospital(): AdventureInfo {
  const HospitalChoice = "choiceAdventure784";
  setProperty(HospitalChoice, "1");

  if (itemAmount($item`dripping stone sphere`) < 1) {
    return {
      location: $location`The Hidden Hospital`,
      modifiers: [Modifier.ItemDrop]
    };
  }
  else {
    return {
      location: $location`An Overgrown Shrine (Southwest)`,
      modifiers: [],
      expectedNoncombat: "Water You Dune",
    };
  }
}

function doBowlingAlley(): AdventureInfo {
    const BowlingAlleyChoice = "choiceAdventure788";
    setProperty(BowlingAlleyChoice, "1");

    const DrunkPygmyProperty = "_drunkPygmyBanishes";
    if (parseInt(getProperty(DrunkPygmyProperty)) < 11 && itemAmount($item`Bowl of Scorpions`) < 1) {
      buy(1, $item`Bowl of Scorpions`);
    }

    if (itemAmount($item`scorched stone sphere`) < 1) {
      return {
        location: $location`The Hidden Bowling Alley`,
        modifiers: [Modifier.ItemDrop],
      };
    }
    else {
      return {
        location: $location`An Overgrown Shrine (Southeast)`,
        modifiers: [],
        expectedNoncombat: "Fire When Ready",
      };
    }
}

function getAncientAmulet(): AdventureInfo {
  const ZigguratChoice = "choiceAdventure791";
  setProperty(ZigguratChoice, "1");

  return {
    location: $location`A Massive Ziggurat`,
    modifiers: [],
    expectedNoncombat: "Protector Spectre",
  };
}
