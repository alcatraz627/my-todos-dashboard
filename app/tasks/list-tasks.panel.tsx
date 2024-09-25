"use client";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ApiService } from "../api/api-caller";
import { TaskRow } from "./task-row/task-row";

// Making direct API calls is better for client side data fetching useQuery
// setup, since the direct server action call only works during SSR

export const ListTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isPending: isLoading } = useQuery({
    queryKey: AppQueryKeys.tasks,
    queryFn: ApiService.tasks.listTasks,
  });

  // The task currently in focus
  // Useful for visual feedback
  const [focusedTask, setFocusedTask] = useState<string | null>(null);

  const { mutateAsync: callDeleteTask } = useMutation({
    mutationFn: createServerAction(ApiService.tasks.deleteTask),
  });

  const { mutateAsync: callUpdateTask } = useMutation({
    mutationFn: createServerAction(ApiService.tasks.updateTask),
  });

  const handleDeleteTask = async (id: string) => {
    // TODO: Ask for confirmation
    setFocusedTask(id);
    const response = await callDeleteTask(id);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: AppQueryKeys.tasks });
    setFocusedTask(null);
    // TODO: Show an "undo" toast
  };

  const handleUpdateTask = async (updateData: Todo) => {
    const response = await callUpdateTask(updateData);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.tasks });

    return updateData;
  };

  return (
    <div className="px-4">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          isInFocus={focusedTask === task.id}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}

      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </div>
  );
};
