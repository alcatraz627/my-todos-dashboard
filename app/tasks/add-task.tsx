"use client";

import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ApiService } from "../api/api-caller";

export const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const { mutateAsync: callAddTask, isPending: isAdding } = useMutation({
    mutationFn: createServerAction(ApiService.tasks.createTask),
  });

  const queryClient = useQueryClient();
  const handleAddTodo = async () => {
    if (!taskTitle) return;

    const response = await callAddTask({ title: taskTitle, description: "" });
    if (!response.success) {
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todos });
    setTaskTitle("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
      className="flex flex-row items-center gap-2 px-4"
    >
      {isAdding && <span className="loading loading-spinner loading-md"></span>}
      <input
        disabled={isAdding}
        type="text"
        placeholder="Add a Todo"
        className="input input-bordered w-full my-4"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
    </form>
  );
};
