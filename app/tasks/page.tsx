import { listTodoGroupsDb } from "@/src/data/todo-group.db";
import { listTodosDb } from "@/src/data/todos.db";
import { AppQueryKeys, getQueryClient } from "@/src/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AddTask } from "./add-task.panel";
import { ListTasks } from "./list-tasks.panel";
import { TaskGroup } from "./task-group.panel";

export default async function Page() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: AppQueryKeys.tasks,
      queryFn: listTodosDb,
    }),
    queryClient.prefetchQuery({
      queryKey: AppQueryKeys.taskGroups,
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
