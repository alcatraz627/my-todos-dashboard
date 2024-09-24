"use client";

import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const AddTask = ({
  addTask,
}: {
  addTask: (title: string) => Promise<Todo>;
}) => {
  const [task, setTask] = useState("");

  const { mutateAsync: callAddTask, isPending: isAdding } = useMutation({
    mutationFn: createServerAction(addTask),
  });

  const queryClient = useQueryClient();
  const handleAddTodo = async () => {
    if (!task) return;

    const response = await callAddTask(task);
    if (!response.success) {
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todos });
    setTask("");
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
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
    </form>
  );
};
