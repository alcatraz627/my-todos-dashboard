import { prisma } from "../db/client";

export const listTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};

export const getTodo = async (id: string) => {
  const todo = await prisma.todo.findUnique({ where: { id } });
  return todo;
};

export const createTodo = async ({
  title,
  description = "",
}: {
  title: string;
  description?: string;
}) => {
  const todo = await prisma.todo.create({
    data: {
      completed: false,
      title,
      description,
    },
  });
  return todo;
};

export const updateTodo = async ({
  id,
  ...data
}: {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}) => {
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
  return todo;
};

export const deleteTodo = async (id: string) => {
  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });
  return todo;
};
