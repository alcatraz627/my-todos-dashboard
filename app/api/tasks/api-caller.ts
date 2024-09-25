import { Todo } from "@prisma/client";
import axios from "axios";
import { PatchPayload } from "../api-utils";

const ApiBaseUrl = "/api/tasks";
const listTasks = async () => {
  const response = await axios.get<Todo[]>(ApiBaseUrl);
  return response.data;
};

const createTask = async (data: PatchPayload<Todo>) => {
  const response = await axios.post<Todo>(ApiBaseUrl, data);
  return response.data;
};

const updateTask = async (data: PatchPayload<Todo>) => {
  const response = await axios.patch<Todo>(ApiBaseUrl, data);
  return response.data;
};

const deleteTask = async (id: string) => {
  const response = await axios.delete<Todo>(`${ApiBaseUrl}/${id}`);
  return response.data;
};

const getTask = async (id: string) => {
  const response = await axios.get<Todo>(`${ApiBaseUrl}/${id}`);
  return response.data;
};

export const TasksApiCaller = {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
};
