"use client";
import { AppQueryKeys } from "@/src/utils";
import { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { twJoin } from "tailwind-merge";

export interface ListTasksProps {
  initialTasks: Todo[];
  deleteTask: (id: string) => Promise<Todo>;
}

// Making direct API calls is better for client side data fetching useQuery
// setup, since the direct server action call only works during SSR
const listTasks = async () => {
  return (await fetch("/tasks/api").then((r) => r.json())) as Todo[];
};

export const ListTasks = ({ deleteTask }: ListTasksProps) => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isPending: isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: listTasks,
  });

  const [focusTodo, setFocusTodo] = useState<string | null>(null);

  const { mutateAsync: callDeleteTodo, isPending: isDeleting } = useMutation({
    mutationFn: deleteTask,
  });

  const handleDeleteTask = async (id: string) => {
    // TODO: Ask for confirmation
    setFocusTodo(id);
    await callDeleteTodo(id);
    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todos });
    setFocusTodo(null);
    // TODO: Show an "undo" toast
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={twJoin(
            "form-control justify-between items-center flex-row",
            task.id === focusTodo && "opacity-35"
          )}
        >
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              defaultChecked={task.completed}
            />
            <span className="label-text">{task.title}</span>
          </label>
          {/* Edit and delete buttons */}
          <div className="flex justify-end gap-0">
            <button className="btn btn-link text-warning btn-sm btn-rounded px-1">
              <FaEdit size={16} />
            </button>
            <button
              className="btn btn-link text-error btn-sm btn-rounded px-1"
              onClick={() => handleDeleteTask(task.id)}
            >
              <MdDelete size={16} />
            </button>
          </div>
        </div>
      ))}

      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
    </div>
  );
};
