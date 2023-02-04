// All properties are assumed to be reset to the empty string
export const Properties = {
  // These are reset at the start of each ascension
  Ascension: {
    // All of these are ints
    Delay: {
      GuildQuest: "myGuildQuestDelay",
      SpookyForest: "mySpookyForestDelay",
    },

    WhiteysGroveVisited: "myWhiteysGroveVisited",
    MeatMaidInstalled: "myMeatMaidInstalled",
  },

  // These are reset at the start of each day
  Daily: {
    // Bitmask: 1 is plot 1, 2 is plot 2, 4 is plot 3
    RockGardenHarvested: "_myRockGardenHarvested",
  },
};
