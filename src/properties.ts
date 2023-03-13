// All properties are assumed to be reset to the empty string
export const Properties = {
  // If true, don't change the current subtask until it is completed
  FocusTask: "myFocusTask",

  // These are reset at the start of each ascension
  Ascension: {
    WhiteysGroveVisited: "myWhiteysGroveVisited",
    MeatMaidInstalled: "myMeatMaidInstalled",
    LighthouseSidequestStarted: "myLighthouseSidequestStarted",
    WarItemsSold: "myWarItemsSold",
    MacGuffinDiaryRead: "myMacGuffinDiaryRead",
    DesertAdventuresDone: "myDesertAdventuresDone",
    PyramidWheelsGathered: "myPyramidWheelsGathered",
    ConfettiUsed: "myConfettiUsed",
    NSRegistrationDeskVisited: "myNSRegistrationDeskVisited",

    // Delayed and forced adventures that can be "burned" with free fights
    Delay: {
      // Delayed adventures
      SpookyForest: "myDelaySpookyForest", // Arboreal Respite - 5
      HauntedGallery: "myDelayHauntedGallery", // Louvre It or Leave It - 5
      HauntedBathroom: "myDelayHauntedBathroom", // Never Gonna Make You Up - 5
      HauntedBallroom: "myDelayHauntedBallroom", // We'll All be Flat - 5
      HauntedBedroom: "myDelayHauntedBedroom", // elegant animated nightstand - 6
      Oasis: "myDelayOasis", // All Across the Sands - 6
      Airship: "myDelayAirship", // Immateria & S.O.C.K - 25

      // Forced adventures
      HiddenOffice: "myDelayHiddenOffice", // Working Holiday - 5
      DarkNeck: "myDelayDarkNeck", // Friar's Dark Neck - 15
      DarkHeart: "myDelayDarkHeart", // Friar's Dark Heart - 15
      DarkElbow: "myDelayDarkElbow", // Friar's Dark Elbow - 15
      HiddenPark: "myDelayHiddenPark", // Dakota Fanning - 7
      HiddenApartment: "myDelayHiddenApartment", // Action Elevator - 9
      CobbsKnob: "myDelayCobbsKnob", // Code Red - 10
      CastleGround: "myDelayCastleGround", // Top of the Castle, Ma - 10
    },
  },

  // These are reset at the start of each day
  Daily: {
    // Bitmask: 1 is plot 1, 2 is plot 2, 4 is plot 3
    RockGardenHarvested: "_myRockGardenHarvested",

    // Number between 0 and 5
    CMGFightsDone: "_myCMGFreeFightsDone",
  },
};
