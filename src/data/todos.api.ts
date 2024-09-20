import { Todo } from "@prisma/client";

export const listTasks = async () => {
  return (await fetch("/tasks/api").then((r) => r.json())) as Todo[];
};
