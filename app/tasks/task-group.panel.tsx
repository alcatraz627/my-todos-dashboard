"use client";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import { ApiService } from "../api/api-caller";
import { AddTaskGroup } from "./task-group/add-task-group";
import { EditTaskGroups } from "./task-group/edit-task-groups";
import { TaskGroupTab } from "./task-group/task-group-tab";

export const TaskGroup = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: callCreateTaskGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.createTaskGroup),
  });

  const { data: taskGroups = [], isFetching: isLoading } = useQuery({
    queryKey: AppQueryKeys.taskGroups,
    queryFn: ApiService.taskGroups.listTaskGroups,
  });

  const [selectedTaskGroup, setSelectedTaskGroups] = useState<string | null>(
    taskGroups?.[0]?.id || null
  );

  const handleSelectTaskGroup = (taskGroupId: string) => {
    setSelectedTaskGroups(taskGroupId);
  };

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

  useEffect(() => {
    if (taskGroups.length === 0) return;

    // If the selected task group is not in the list, select the last one
    // Also works for no selection
    if (!taskGroups.find((t) => t.id === selectedTaskGroup)) {
      setSelectedTaskGroups(taskGroups[taskGroups.length - 1].id);
    }
  }, [taskGroups, selectedTaskGroup]);

  return (
    <div className="mt-auto w-[100%] flex flex-row flex-grow-0 bg-base-200 justify-between items-center">
      <span
        className={twJoin(
          "tab loading loading-spinner mx-0 px-2 loading-xs bg-accent",
          isLoading ? "visible" : "invisible"
        )}
      ></span>
      <div className="tabs tabs-boxed w-[100%] justify-start" role="tablist">
        {taskGroups.map((taskGroup) => (
          <TaskGroupTab
            key={taskGroup.id}
            selected={selectedTaskGroup === taskGroup.id}
            title={taskGroup.title}
            onClick={() => handleSelectTaskGroup(taskGroup.id)}
          />
        ))}
      </div>
      <AddTaskGroup handleAddNew={handleAddNewTaskGroup} />
      <EditTaskGroups taskGroups={taskGroups} />
    </div>
  );
};
