import { listTodoGroupsDb } from "@/src/data/todo-group";
import { listTodosDb } from "@/src/data/todos";
import { AppQueryKeys, getQueryClient } from "@/src/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AddTask } from "./add-task";
import { ListTasks } from "./list-tasks";
import { TaskGroup } from "./task-group";

export default async function Page() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: AppQueryKeys.todos,
      queryFn: listTodosDb,
    }),
    queryClient.prefetchQuery({
      queryKey: AppQueryKeys.todoGroups,
      queryFn: listTodoGroupsDb,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="h-max flex-grow flex flex-col justify-between">
      <AddTask />
      <HydrationBoundary state={dehydratedState}>
        <ListTasks />
        <TaskGroup />
      </HydrationBoundary>
    </div>
  );
}
