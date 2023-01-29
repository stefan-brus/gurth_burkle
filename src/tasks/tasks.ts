import { print } from "kolmafia";
import { L02Task } from "./ascension/L02_spooky_forest";
import { CloversTask } from "./daily";
import { Task } from "./task";

export const AscensionTasks: Task[] = [
  L02Task,
];

export const DailyTasks: Task[] = [
  CloversTask,
];

export const IdleTask: Task = {
  name: "Idle",
  subtasks: [
    {
      name: "Idle",
      available: () => true,
      progress: () => {return},
      completed: () => false,
    },
  ],
};

export function printTaskList(tasks: Task[]) {
  tasks.forEach(task => {
    print(`${task.name}:`);

    let subtasksComplete = 0;
    task.subtasks.forEach(subtask => {
      const completed = subtask.completed();

      if (completed)
      {
        subtasksComplete++;
      }

      print(`- ${subtask.name}: ${completed ? "" : "in"}complete`)
    });

    if (subtasksComplete === task.subtasks.length) {
      print(`${task.name} complete.`);
    }
  });
};
