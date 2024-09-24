"use client";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { twJoin } from "tailwind-merge";

export const TaskTab = ({
  title,
  selected,
  onClick,
  onUpdateText,
  onDeleteGroup,
}: {
  title: string | JSX.Element;
  selected?: boolean;
  onClick: () => void;
  onUpdateText: (text: string) => Promise<TodoGroup | void>;
  onDeleteGroup: () => Promise<void>;
}) => {
  const queryClient = useQueryClient();

  const handleDeleteGroup = async () => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    await onDeleteGroup();
    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todoGroups });
  };
  return (
    <a
      role="tab"
      className={twJoin(
        "tab transition bg-base-200 flex flex-row justify-between px-4",
        selected && "tab-active !bg-info"
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div
        className="flex-1"
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onUpdateText(e.currentTarget.innerText);
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          if (!e.currentTarget.innerText) return;
          if (e.currentTarget.innerText === title) return;

          onUpdateText(e.currentTarget.innerText);
        }}
      >
        {title}
      </div>
      <MdDelete onClick={handleDeleteGroup} />
    </a>
  );
};

export const AddTaskGroupTitle = ({
  addTaskGroup,
}: {
  addTaskGroup: (title: string) => Promise<TodoGroup>;
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

export const AddNewTask = ({
  handleAddNew,
}: {
  handleAddNew: (p: string) => Promise<TodoGroup>;
}) => {
  return (
    <div className="dropdown dropdown-top dropdown-left tab bg-base-200">
      <div
        role="button"
        className="focus:text-accent"
        // onClick={() => handleAddNew("New Group")}
        tabIndex={0}
      >
        <FaSquarePlus />
      </div>

      <div
        className="dropdown-content menu bg-base-100 rounded-box z-[1] shadow border-2 border-info mb-3 [inset-inline-end:0px!important] w-[calc(100vw-50px)]"
        tabIndex={0}
      >
        <AddTaskGroupTitle addTaskGroup={handleAddNew} />
      </div>
    </div>
  );
};
