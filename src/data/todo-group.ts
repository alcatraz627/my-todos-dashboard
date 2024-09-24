import { prisma } from "../db/client";

export const listTodoGroups = async () => {
  const todos = await prisma.todoGroup.findMany({
    orderBy: {
      created_at: "asc",
    },
  });
  return todos;
};

export const getTodoGroup = async (id: string) => {
  const todoGroup = await prisma.todoGroup.findUnique({ where: { id } });
  return todoGroup;
};

export const createTodoGroup = async ({
  title,
  description = "",
}: {
  title: string;
  description?: string;
}) => {
  const todo = await prisma.todoGroup.create({
    data: {
      title,
      description,
    },
  });
  return todo;
};

export const addTodoToGroup = async ({
  todoId,
  groupId,
}: {
  todoId: string;
  groupId: string;
}) => {
  const todo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      todoGroupId: groupId,
    },
  });
  return todo;
};

export const updateTodoGroup = async ({
  id,
  ...data
}: {
  id: string;
  title: string;
  description?: string;
}) => {
  const todo = await prisma.todoGroup.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
  return todo;
};

export const deleteTodoGroup = async (id: string) => {
  const todo = await prisma.todoGroup.delete({
    where: {
      id,
    },
  });
  return todo;
};
