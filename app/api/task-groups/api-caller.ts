import { Todo, TodoGroup } from "@prisma/client";
import axios from "axios";
import { PatchPayload, PatchPayloadWithId } from "../api-utils";

const ApiBaseUrl = "/api/task-groups";

const listTaskGroups = async () => {
  const response = await axios.get<TodoGroup[]>(ApiBaseUrl);
  return response.data;
};

const createTaskGroup = async (data: PatchPayload<TodoGroup>) => {
  const response = await axios.post<TodoGroup>(ApiBaseUrl, data);
  return response.data;
};

const updateTaskGroup = async (data: PatchPayloadWithId<TodoGroup>) => {
  const response = await axios.patch<TodoGroup>(
    `${ApiBaseUrl}/${data.id}`,
    data
  );
  return response.data;
};

const deleteTaskGroup = async (id: TodoGroup["id"]) => {
  const response = await axios.delete<TodoGroup>(`${ApiBaseUrl}/${id}`);
  return response.data;
};

const addTaskToGroup = async ({
  taskId,
  groupId,
}: {
  taskId: string;
  groupId: string;
}) => {
  const response = await axios.post<Todo>(`${ApiBaseUrl}/${groupId}/${taskId}`);

  return response;
};

export const TaskGroupsApiCaller = {
  addTaskToGroup,
  listTaskGroups,
  createTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
};
