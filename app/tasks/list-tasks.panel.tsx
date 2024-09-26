"use client";
import { AppMutationKeys, AppQueryKeys } from "@/src/utils";
import { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ApiService } from "../api/api-caller";
import { _defaultTaskGroup, useSelectedTaskGroup } from "./state";
import { TaskRow } from "./task-row/task-row";

// Making direct API calls is better for client side data fetching useQuery
// setup, since the direct server action call only works during SSR

export const ListTasks = () => {
  const queryClient = useQueryClient();

  const [selectedTaskGroup] = useSelectedTaskGroup();

  const { data: tasks = [], isPending: isLoading } = useQuery({
    queryKey: AppQueryKeys.tasks,
    queryFn: ApiService.tasks.listTasks,
  });

  // The task currently in focus
  // Useful for visual feedback
  const [focusedTask, setFocusedTask] = useState<string | null>(null);

  const { mutateAsync: callDeleteTask } = useMutation({
    mutationFn: ApiService.tasks.deleteTask,
    mutationKey: AppMutationKeys.tasks.delete(),
  });

  const { mutateAsync: callUpdateTask } = useMutation({
    mutationFn: ApiService.tasks.updateTask,
    mutationKey: AppMutationKeys.tasks.update(),
  });

  const {
    mutateAsync: callAddTaskToGroup,
    isPending: isPendingAddTaskToGroup,
  } = useMutation({
    mutationFn: ApiService.taskGroups.addTaskToGroup,
  });

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setFocusedTask(id);
    const response = await callDeleteTask(id);

    await queryClient.invalidateQueries({ queryKey: AppQueryKeys.tasks });
    setFocusedTask(null);
    // TODO: Show an "undo" toast
  };

  const handleUpdateTask = async (updateData: Todo) => {
    const response = await callUpdateTask(updateData);

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.tasks });

    return updateData;
  };

  const handleUpdateTaskGroup = async (data: {
    taskId: string;
    groupId: string;
  }) => {
    if (isPendingAddTaskToGroup) return;

    const response = await callAddTaskToGroup(data);

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.tasks });

    return response;
  };

  const filteredTasks = useMemo(() => {
    if (!selectedTaskGroup || selectedTaskGroup === _defaultTaskGroup)
      return tasks.sort((b, a) => {
        if (a.todoGroupId && b.todoGroupId) {
          return a.todoGroupId.localeCompare(b.todoGroupId);
        }
        return 0;
      });

    return tasks.filter((t) => t.todoGroupId === selectedTaskGroup);
  }, [tasks, selectedTaskGroup]);

  return (
    <>
      <div className="px-4">
        {filteredTasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            isInFocus={focusedTask === task.id}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTaskGroup={handleUpdateTaskGroup}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center h-[100%] flex flex-col justify-center">
          <h1 className="text-xl font-light">No Tasks Found</h1>
        </div>
      )}

      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </>
  );
};
