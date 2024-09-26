"use client";
import { AppQueryKeys } from "@/src/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { twJoin } from "tailwind-merge";
import { ApiService } from "../api/api-caller";
import { useSelectedTaskGroup } from "./state";
import { EditTaskGroups } from "./task-group/edit-task-groups";
import { TaskGroupTab } from "./task-group/task-group-tab";

export const TaskGroup = () => {
  const { data: taskGroups = [], isFetching: isLoading } = useQuery({
    queryKey: AppQueryKeys.taskGroups,
    queryFn: ApiService.taskGroups.listTaskGroups,
  });

  const [selectedTaskGroup, setSelectedTaskGroups] = useSelectedTaskGroup();

  const handleSelectTaskGroup = (taskGroupId: string) => {
    setSelectedTaskGroups(taskGroupId);
  };

  useEffect(() => {
    console.log({ taskGroups, selectedTaskGroup });
    if (taskGroups.length === 0) return;
    if (!selectedTaskGroup) return;

    // If the selected task group is not in the list, select the last one
    if (!taskGroups.find((t) => t.id === selectedTaskGroup)) {
      setSelectedTaskGroups(taskGroups[0].id);
    }
  }, [taskGroups, selectedTaskGroup]);

  return (
    <div className="mt-auto w-[100%] flex flex-row flex-grow-0 bg-base-200 justify-between items-center">
      <span
        className={twJoin(
          "loading loading-spinner mx-2 px-0 loading-xs bg-accent",
          isLoading ? "visible" : "invisible"
        )}
      />
      <div
        className="tabs tabs-boxed w-max justify-start max-w-[90vw] overflow-x-auto mr-auto"
        role="tablist"
      >
        {taskGroups.map((taskGroup) => (
          <TaskGroupTab
            key={taskGroup.id}
            selected={selectedTaskGroup === taskGroup.id}
            title={taskGroup.title}
            onClick={() => handleSelectTaskGroup(taskGroup.id)}
          />
        ))}
      </div>
      <EditTaskGroups taskGroups={taskGroups} />
    </div>
  );
};
