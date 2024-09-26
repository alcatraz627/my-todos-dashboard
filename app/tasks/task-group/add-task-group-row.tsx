"use client";
import { AppMutationKeys, AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

export const AddTaskGroupRow = ({
  addTaskGroup: handleAdd,
}: {
  addTaskGroup: (title: string) => Promise<TodoGroup | void>;
}) => {
  const queryClient = useQueryClient();
  const [newTaskGroup, setNewTaskGroup] = useState("");

  const { mutateAsync: callAddTaskGroup, isPending: isAdding } = useMutation({
    mutationFn: createServerAction(handleAdd),
    mutationKey: AppMutationKeys.taskGroups.create(),
  });

  const handleAddTaskGroup = async () => {
    if (!newTaskGroup) return;

    const response = await callAddTaskGroup(newTaskGroup);
    if (!response.success) {
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.taskGroups });
    setNewTaskGroup("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAddTaskGroup();
      }}
      className="flex flex-row items-center gap-2 p-0"
    >
      <label className="input mb-2 w-[100%] px-1 input-sm text-xs flex flex-row items-center gap-2 text-neutral">
        {isAdding ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <CiCirclePlus size={20} />
        )}
        <input
          className="grow text-white"
          readOnly={isAdding}
          type="text"
          placeholder="New Task Group Name"
          value={newTaskGroup}
          onChange={(e) => setNewTaskGroup(e.target.value)}
        />
      </label>
    </form>
  );
};
