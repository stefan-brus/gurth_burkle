import { availableAmount, setProperty } from "kolmafia";
import { $item } from "libram";

export function setJuneCleaverChoices() {
  const AuntsChoice = "choiceAdventure1468";
  setProperty(AuntsChoice, "2");

  const BathChoice = "choiceAdventure1473";
  setProperty(BathChoice, "1");

  const BewareChoice = "choiceAdventure1469";
  setProperty(BewareChoice, "2");

  const DeliciousChoice = "choiceAdventure1474";
  setProperty(DeliciousChoice, "1");

  const HypnoticChoice = "choiceAdventure1475";
  setProperty(HypnoticChoice, availableAmount($item`mother's necklace`) > 0 ? "2" : "1");

  const LostChoice = "choiceAdventure1471";
  setProperty(LostChoice, "1");

  const PoeticChoice = "choiceAdventure1467";
  setProperty(PoeticChoice, "3");

  const SummerChoice = "choiceAdventure1472";
  setProperty(SummerChoice, "1");

  const TeacherChoice = "choiceAdventure1470";
  setProperty(TeacherChoice, availableAmount($item`teacher's pen`) > 0 ? "3" : "2");
}
