import { TaskGroupsApiCaller } from "./task-groups/api-caller";
import { TasksApiCaller } from "./tasks/api-caller";

// Use this
export const ApiService = {
  tasks: TasksApiCaller,
  taskGroups: TaskGroupsApiCaller,
};
