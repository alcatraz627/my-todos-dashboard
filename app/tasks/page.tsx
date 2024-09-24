import {
  createTodoGroup,
  deleteTodoGroup,
  listTodoGroups,
  updateTodoGroup,
} from "@/src/data/todo-group";
import {
  createTodo,
  deleteTodo,
  listTodos,
  updateTodo,
} from "@/src/data/todos";
import { AppQueryKeys, getQueryClient } from "@/src/utils";
import { Todo, TodoGroup } from "@prisma/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AddTask } from "./add-task";
import { ListTasks } from "./list-tasks";
import { TaskGroup } from "./task-group";

export default async function Page() {
  const addTask = async (title: string) => {
    "use server";

    const newTodo = await createTodo({
      title,
    });

    return newTodo;
  };

  const updateTask = async (task: Todo) => {
    "use server";
    return await updateTodo(task);
  };

  const deleteTask = async (id: string) => {
    "use server";
    return await deleteTodo(id);
  };

  const addTaskGroup = async (title: string) => {
    "use server";

    const newTodoGroup = await createTodoGroup({
      title,
    });

    return newTodoGroup;
  };

  const updateTaskGroup = async (taskGroup: TodoGroup) => {
    "use server";
    return await updateTodoGroup(taskGroup);
  };

  const deleteTaskGroup = async (id: string) => {
    "use server";
    return await deleteTodoGroup(id);
  };

  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: AppQueryKeys.todos,
      queryFn: listTodos,
    }),
    queryClient.prefetchQuery({
      queryKey: AppQueryKeys.todoGroups,
      queryFn: listTodoGroups,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="h-max flex-grow flex flex-col justify-between">
      <AddTask addTask={addTask} />
      <HydrationBoundary state={dehydratedState}>
        <ListTasks deleteTask={deleteTask} updateTask={updateTask} />
        <TaskGroup
          addTaskGroup={addTaskGroup}
          updateTaskGroup={updateTaskGroup}
          deleteTaskGroup={deleteTaskGroup}
        />
      </HydrationBoundary>
    </div>
  );
}
