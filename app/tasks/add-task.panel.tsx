"use client";

import { AppMutationKeys, AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ApiService } from "../api/api-caller";

export const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const { mutateAsync: callAddTask, isPending: isAdding } = useMutation({
    mutationFn: createServerAction(ApiService.tasks.createTask),
    mutationKey: AppMutationKeys.tasks.create(),
  });

  const queryClient = useQueryClient();
  const handleAddTask = async () => {
    if (!taskTitle) return;

    const response = await callAddTask({ title: taskTitle, description: "" });
    if (!response.success) {
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.tasks });
    setTaskTitle("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}
      className="flex flex-row items-center gap-2 px-4"
    >
      {isAdding && <span className="loading loading-spinner loading-md"></span>}
      <input
        disabled={isAdding}
        type="text"
        placeholder="Add a Task"
        className="input input-bordered w-full my-4"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
    </form>
  );
};
