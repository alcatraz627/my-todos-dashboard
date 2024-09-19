"use client";

import { AppQueryKeys } from "@/src/utils";
import { Todo } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const AddTask = ({
  addTask,
}: {
  addTask: (title: string) => Promise<Todo>;
}) => {
  const [task, setTask] = useState("");
  const queryClient = useQueryClient();
  const handleAddTodo = async () => {
    if (!task) return;

    await addTask(task);
    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todos });
    setTask("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
    >
      <input
        type="text"
        placeholder="Add a Todo"
        className="input input-bordered w-full my-4"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
    </form>
  );
};
