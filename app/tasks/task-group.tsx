"use client";
import { listTaskGroups } from "@/src/data/todos.api";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { TodoGroup } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AddNewTask, TaskTab } from "./task-group/components";

export const TaskGroup = ({
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
}: {
  addTaskGroup: (title: string) => Promise<TodoGroup>;
  updateTaskGroup: (data: TodoGroup) => Promise<TodoGroup>;
  deleteTaskGroup: (id: string) => Promise<TodoGroup>;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: callDeleteTodoGroup } = useMutation({
    mutationFn: createServerAction(deleteTaskGroup),
  });

  const { mutateAsync: callUpdateTodoGroup } = useMutation({
    mutationFn: createServerAction(updateTaskGroup),
  });

  const { data: todoGroups = [], isPending: isLoading } = useQuery({
    queryKey: AppQueryKeys.todoGroups,
    queryFn: listTaskGroups,
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
    <div className="mt-auto tabs tabs-boxed" role="tablist">
      {todoGroups.map((todoGroup) => (
        <TaskTab
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
      <AddNewTask handleAddNew={addTaskGroup} />
      {isLoading && (
        <span className=" tab loading loading-spinner loading-sm ml-auto mr-0"></span>
      )}
    </div>
  );
};
