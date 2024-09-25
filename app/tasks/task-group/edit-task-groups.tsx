"use client";
import { ApiService } from "@/app/api/api-caller";
import { PatchPayloadWithId } from "@/app/api/api-utils";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FaCaretUp } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { twJoin } from "tailwind-merge";

const EditTaskGroupRow = ({
  taskGroup,
  handleUpdate,
  handleDelete,
  isSingleEntity,
}: {
  taskGroup: TodoGroup;
  handleUpdate: (
    newData: PatchPayloadWithId<TodoGroup>
  ) => Promise<TodoGroup | void>;
  handleDelete: () => Promise<void>;
  isSingleEntity?: boolean;
}) => {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-2 flex flex-row items-center justify-between mb-2 mt-2">
      <span
        className={twJoin(
          "badge relative border-neutral border-2 bg-neutral badge-sm",
          `bg-[${taskGroup.color}]`
        )}
      />
      <div
        ref={titleRef}
        className="ml-0 mr-auto px-2 min-w-[20ch]"
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleUpdate({
              id: taskGroup.id,
              title: e.currentTarget.innerText,
            });
            e.currentTarget.blur();
          }
        }}
        onBlur={() => {
          if (!titleRef.current) return;
          const currTextVal = titleRef.current.innerHTML;

          if (!currTextVal) return;
          if (currTextVal === taskGroup.title) return;

          handleUpdate({
            id: taskGroup.id,
            title: currTextVal,
          });
        }}
      >
        {taskGroup.title}
      </div>
      <div
        className={twJoin(
          "px-0 text-lg",
          isSingleEntity ? "text-error" : "text-neutral"
        )}
      >
        <MdDelete className="" onClick={() => handleDelete()} />
      </div>
    </div>
  );
};

export const EditTaskGroups = ({ taskGroups }: { taskGroups: TodoGroup[] }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: callDeleteTaskGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.deleteTaskGroup),
  });

  const { mutateAsync: callUpdateTaskGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.updateTaskGroup),
  });

  const handleUpdateTaskGroup = async (
    updateData: PatchPayloadWithId<TodoGroup>
  ) => {
    const response = await callUpdateTaskGroup(updateData);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.taskGroups });

    return response.value;
  };

  const handleDeleteTaskGroup = async (taskGroupId: string) => {
    // Only delete if there is more than one group
    if (taskGroups.length < 2) return;
    if (!confirm("Are you sure you want to delete this group?")) return;

    const response = await callDeleteTaskGroup(taskGroupId);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: AppQueryKeys.taskGroups });
    // TODO: Show an "undo" toast
  };

  return (
    <div className="dropdown dropdown-top dropdown-left bg-base-200 mx-3">
      <div role="button" className="focus:text-accent" tabIndex={0}>
        <FaCaretUp size={22} />
      </div>

      <div
        className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow border-2 border-info w-max"
        tabIndex={0}
      >
        {taskGroups.map((taskGroup) => (
          <EditTaskGroupRow
            key={taskGroup.id}
            isSingleEntity={taskGroups.length > 1}
            taskGroup={taskGroup}
            handleDelete={() => handleDeleteTaskGroup(taskGroup.id)}
            handleUpdate={handleUpdateTaskGroup}
          />
        ))}
      </div>
    </div>
  );
};
