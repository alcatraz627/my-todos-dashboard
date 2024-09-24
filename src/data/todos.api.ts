import { Todo, TodoGroup } from "@prisma/client";

export const listTasks = async () => {
  return (await fetch("/api/tasks").then((r) => r.json())) as Todo[];
};

export const listTaskGroups = async () => {
  return (await fetch("/api/task-groups").then((r) => r.json())) as TodoGroup[];
};
