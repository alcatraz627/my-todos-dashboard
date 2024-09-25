"use client";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ApiService } from "../api/api-caller";
import { AddTaskGroup } from "./task-group/add-task-group";
import { TaskGroupTab } from "./task-group/task-group-tab";

export const TaskGroup = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: callCreateTodoGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.createTaskGroup),
  });

  const { mutateAsync: callDeleteTodoGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.deleteTaskGroup),
  });

  const { mutateAsync: callUpdateTodoGroup } = useMutation({
    mutationFn: createServerAction(ApiService.taskGroups.updateTaskGroup),
  });

  const { data: todoGroups = [], isPending: isLoading } = useQuery({
    queryKey: AppQueryKeys.todoGroups,
    queryFn: ApiService.taskGroups.listTaskGroups,
  });

  // const [taskGroups, setTaskGroups] = useState(["Default", "Alone"]);
  const [selectedTodoGroup, setSelectedTodoGroups] = useState<string | null>(
    todoGroups?.[0]?.id || null
  );

  const handleSelectTodoGroup = (todoGroupId: string) => {
    setSelectedTodoGroups(todoGroupId);
  };

  const handleDeleteTodoGroup = async (id: string) => {
    // TODO: Ask for confirmation
    // setFocusTodo(id);
    const response = await callDeleteTodoGroup(id);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    if (id === selectedTodoGroup) {
      setSelectedTodoGroups(todoGroups?.[todoGroups.length - 1]?.id || null);
    }

    await queryClient.invalidateQueries({ queryKey: AppQueryKeys.todoGroups });
    // setFocusTodo(null);
    // TODO: Show an "undo" toast
  };

  const handleAddNewTodoGroup = async (title: TodoGroup["title"]) => {
    const response = await callCreateTodoGroup({
      title,
      description: "",
      color: "",
    });

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todoGroups });

    return response.value;
  };

  const handleUpdateTodoGroup = async (updateData: TodoGroup) => {
    const response = await callUpdateTodoGroup(updateData);

    if (!response.success) {
      // TODO: Show error
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todoGroups });

    return updateData;
  };

  return (
    <div className="mt-auto w-[100%] flex flex-row flex-grow-0 bg-base-200 justify-between items-center">
      <div className="tabs tabs-boxed w-[100%] justify-start" role="tablist">
        {todoGroups.map((todoGroup) => (
          <TaskGroupTab
            key={todoGroup.id}
            selected={selectedTodoGroup === todoGroup.id}
            title={todoGroup.title}
            onClick={() => handleSelectTodoGroup(todoGroup.id)}
            onUpdateText={(newTitle: string) =>
              handleUpdateTodoGroup({ ...todoGroup, title: newTitle })
            }
            onDeleteGroup={() => handleDeleteTodoGroup(todoGroup.id)}
          />
        ))}
      </div>
      {isLoading && (
        <span className="tab loading loading-spinner loading-sm ml-auto mr-0"></span>
      )}
      <AddTaskGroup handleAddNew={handleAddNewTodoGroup} />
    </div>
  );
};
