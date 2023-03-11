import { availableChoiceOptions, getProperty, handlingChoice, lastChoice, runChoice } from "kolmafia";

// For choices that cannot be neatly handled by the main scripts
export function main(choice: number, page: string) {
  // Rufus' Quest
  switch (choice) {
    case 1499: // A Labyrinth of Shadows
      while (handlingChoice() && lastChoice() === 1499) {
        const artifact = getProperty(RufusWantsProperty);
        const options = availableChoiceOptions(true);
        
        for (const choice of [2, 3, 4]) {
          if (options[choice].toLowerCase().includes(artifact.toLowerCase())) {
            runChoice(choice);
            return;
          }
        }
    
        runChoice(1);
      }
      break;
  }
}

const RufusWantsProperty = "rufusQuestTarget";
