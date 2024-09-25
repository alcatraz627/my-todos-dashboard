import { TodoGroup } from "@prisma/client";
import { prisma } from "../db/client";

export const listTodoGroupsDb = async () => {
  const todos = await prisma.todoGroup.findMany({
    orderBy: {
      created_at: "asc",
    },
  });
  return todos;
};

export const getTodoGroupDb = async (id: string) => {
  const todoGroup = await prisma.todoGroup.findUnique({ where: { id } });
  return todoGroup;
};

export const createTodoGroupDb = async (data: Omit<TodoGroup, "id">) => {
  const todo = await prisma.todoGroup.create({
    data,
  });
  return todo;
};

export const addTodoToGroupDb = async ({
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

export const updateTodoGroupDb = async ({ id, ...data }: TodoGroup) => {
  const todo = await prisma.todoGroup.update({
    where: {
      id,
    },
    data,
  });
  return todo;
};

export const deleteTodoGroupDb = async (id: TodoGroup["id"]) => {
  const todo = await prisma.todoGroup.delete({
    where: {
      id,
    },
  });
  return todo;
};
