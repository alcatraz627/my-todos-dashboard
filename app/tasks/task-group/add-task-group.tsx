"use client";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";

export const AddTaskGroupTitle = ({
  addTaskGroup,
}: {
  addTaskGroup: (title: string) => Promise<TodoGroup | void>;
}) => {
  const queryClient = useQueryClient();
  const [newTaskGroup, setNewTaskGroup] = useState("");

  const { mutateAsync: callAddTaskGroup, isPending: isAdding } = useMutation({
    mutationFn: createServerAction(addTaskGroup),
  });

  const handleAddTaskGroup = async () => {
    if (!newTaskGroup) return;

    const response = await callAddTaskGroup(newTaskGroup);
    if (!response.success) {
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todoGroups });
    setNewTaskGroup("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTaskGroup();
      }}
      className="flex flex-row items-center gap-2 p-0"
    >
      {isAdding && <span className="loading loading-spinner loading-md"></span>}
      <input
        disabled={isAdding}
        type="text"
        placeholder="New Todo Group Name"
        className="input input-bordered my-2 w-[100%]"
        value={newTaskGroup}
        onChange={(e) => setNewTaskGroup(e.target.value)}
      />
    </form>
  );
};

export const AddTaskGroup = ({
  handleAddNew,
}: {
  handleAddNew: (p: string) => Promise<TodoGroup | void>;
}) => {
  return (
    <div className="dropdown dropdown-top dropdown-left bg-base-200 max-w-[40px] mx-3">
      <div role="button" className="focus:text-accent" tabIndex={0}>
        <FaSquarePlus />
      </div>

      <div
        className="dropdown-content menu bg-base-100 rounded-box z-[1] shadow border-2 border-info mb-3 [inset-inline-end:0px!important] w-[70vw]"
        tabIndex={0}
      >
        <AddTaskGroupTitle addTaskGroup={handleAddNew} />
      </div>
    </div>
  );
};
