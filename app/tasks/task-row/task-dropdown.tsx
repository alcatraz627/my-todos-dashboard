import { ApiService } from "@/app/api/api-caller";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { Todo, TodoGroup } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaListAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SelectTaskGroup } from "./select-task-group";

export const TaskDropdown = ({
  task,
  handleDeleteTask,
  children,
  taskGroups,
}: {
  task: Todo;
  handleDeleteTask: (id: string) => Promise<void>;
  children: JSX.Element;
  taskGroups: TodoGroup[];
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: callAddTaskToGroup, isPending: isProcessing } =
    useMutation({
      mutationFn: createServerAction(ApiService.taskGroups.addTaskToGroup),
    });

  const handleUpdateTaskGroup = async (data: {
    taskId: string;
    groupId: string;
  }) => {
    if (isProcessing) return;

    const response = await callAddTaskToGroup(data);

    if (!response.success) {
      console.log(response.error);
      return;
    }

    queryClient.invalidateQueries({ queryKey: AppQueryKeys.tasks });
  };

  return (
    <div className="dropdown dropdown-end">
      {children}
      <ul
        className="dropdown-content menu bg-base-100 rounded-box z-[1] min-w-md w-fit max-w-xl p-2 shadow border-2 border-info"
        tabIndex={0}
      >
        <li>
          <div className="px-3 w-fit">
            <FaListAlt size={18} className="pb-1" />
            <SelectTaskGroup
              task={task}
              handleUpdateTaskGroup={handleUpdateTaskGroup}
              taskGroups={taskGroups}
            />
            {isProcessing && (
              <span className="loading loading-spinner loading-xs bg-accent"></span>
            )}
          </div>
        </li>
        <li onClick={() => handleDeleteTask(task.id)}>
          <a className="px-3 text-error">
            <MdDelete size={20} className="pb-1" />
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
};
