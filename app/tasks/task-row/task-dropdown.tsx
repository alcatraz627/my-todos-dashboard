import { ApiService } from "@/app/api/api-caller";
import { AppQueryKeys } from "@/src/utils";
import { createServerAction } from "@/src/utils/server-actions";
import { Todo, TodoGroup } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaListAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const TaskDropdown = ({
  task,
  handleDeleteTask,
  children,
}: {
  task: Todo;
  handleDeleteTask: (id: string) => Promise<void>;
  children: JSX.Element;
}) => {
  const queryClient = useQueryClient();
  const { data: taskGroups = [] } = useQuery<TodoGroup[]>({
    queryKey: AppQueryKeys.taskGroups,
  });

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
            <select
              className="select select-sm ml-[-10px]"
              value={task.todoGroupId || ""}
              onChange={(e) => {
                handleUpdateTaskGroup({
                  taskId: task.id,
                  groupId: e.target.value,
                });
              }}
            >
              <option disabled>Move to Task Group</option>
              <option>None</option>
              {taskGroups.map((taskGroup) => (
                <option key={taskGroup.id} value={taskGroup.id}>
                  {taskGroup.title}
                </option>
              ))}
            </select>
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
