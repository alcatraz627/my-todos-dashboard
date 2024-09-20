import {
  createTodo,
  deleteTodo,
  listTodos,
  updateTodo,
} from "@/src/data/todos";
import { AppQueryKeys, getQueryClient } from "@/src/utils";
import { Todo } from "@prisma/client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AddTask } from "./add-task";
import { ListTasks } from "./list-tasks";

export default async function Page() {
  const initialTasks = await listTodos();

  const handleAddTask = async (title: string) => {
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

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: AppQueryKeys.todos,
    queryFn: listTodos,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="px-4">
      <AddTask addTask={handleAddTask} />
      <HydrationBoundary state={dehydratedState}>
        <ListTasks
          initialTasks={initialTasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </HydrationBoundary>
    </div>
  );
}
