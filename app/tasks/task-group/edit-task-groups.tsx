"use client";
import { ApiService } from "@/app/api/api-caller";
import { PatchPayloadWithId } from "@/app/api/api-utils";
import { AppMutationKeys, AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaCaretUp } from "react-icons/fa6";
import { AddTaskGroupRow } from "./add-task-group-row";
import { EditTaskGroupRow } from "./edit-task-group-row";

export const EditTaskGroups = ({ taskGroups }: { taskGroups: TodoGroup[] }) => {
  const queryClient = useQueryClient();
  const [focusTodoGroup, setFocusTodoGroup] = useState<string | null>(null);

  const { mutateAsync: callCreateTaskGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.createTaskGroup),
    mutationKey: AppMutationKeys.taskGroups.create(),
  });

  const { mutateAsync: callDeleteTaskGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.deleteTaskGroup),
    mutationKey: AppMutationKeys.taskGroups.delete(),
  });

  const { mutateAsync: callUpdateTaskGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.updateTaskGroup),
    mutationKey: AppMutationKeys.taskGroups.update(),
  });

  const handleAddNewTaskGroup = async (title: TodoGroup["title"]) => {
    const response = await callCreateTaskGroup({
      title,
      description: "",
      color: "",
    });

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.taskGroups });

    return response.value;
  };

  const handleUpdateTaskGroup = async (
    updateData: PatchPayloadWithId<TodoGroup>
  ) => {
    setFocusTodoGroup(updateData.id);
    const response = await callUpdateTaskGroup(updateData);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      setFocusTodoGroup(null);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.taskGroups });

    setFocusTodoGroup(null);
    return response.value;
  };

  const handleDeleteTaskGroup = async (taskGroupId: string) => {
    // Only delete if there is more than one group
    if (!taskGroups.length) return;
    if (!confirm("Are you sure you want to delete this group?")) return;
    setFocusTodoGroup(taskGroupId);

    const response = await callDeleteTaskGroup(taskGroupId);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      setFocusTodoGroup(null);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: AppQueryKeys.taskGroups });
    setFocusTodoGroup(null);
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
            isInFocus={taskGroup.id === focusTodoGroup}
            taskGroup={taskGroup}
            handleDelete={() => handleDeleteTaskGroup(taskGroup.id)}
            handleUpdate={handleUpdateTaskGroup}
          />
        ))}
        <AddTaskGroupRow addTaskGroup={handleAddNewTaskGroup} />
      </div>
    </div>
  );
};
