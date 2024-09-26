import { AppQueryKeys } from "@/src/utils";
import { Todo, TodoGroup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { FaCaretDown, FaEdit } from "react-icons/fa";
import { SiClockify } from "react-icons/si";
import { twJoin } from "tailwind-merge";
import { _defaultTaskGroup, useSelectedTaskGroup } from "../state";
import { SelectTaskGroup } from "./select-task-group";
import { TaskCompleted } from "./task-completed";
import { TaskDropdown } from "./task-dropdown";
import { TaskTitle } from "./task-title";

export const TaskRow = ({
  task,
  isInFocus,
  handleUpdateTask,
  handleDeleteTask,
  handleUpdateTaskGroup,
}: {
  task: Todo;
  isInFocus: boolean;
  handleUpdateTask: (task: Todo) => Promise<Todo | void>;
  handleDeleteTask: (id: string) => Promise<void>;
  handleUpdateTaskGroup: (data: {
    taskId: string;
    groupId: string;
  }) => Promise<void>;
}) => {
  const toolbarBtnClass =
    "btn btn-rounded btn-md pl-2 pr-2 h-10 min-h-6 join-item";

  const [selectedTaskGroup] = useSelectedTaskGroup();
  const isAllTasks = selectedTaskGroup === _defaultTaskGroup;

  const { data: taskGroups = [] } = useQuery<TodoGroup[]>({
    queryKey: AppQueryKeys.taskGroups,
  });

  const taskGroup = taskGroups.find((t) => t.id === task.todoGroupId);

  return (
    <div
      key={task.id}
      className={twJoin(
        "form-control justify-between items-center flex-row mb-2",
        isInFocus && "opacity-35"
      )}
    >
      <TaskCompleted
        completed={task.completed}
        handleUpdateTaskCompleted={async (newCompleted) => {
          await handleUpdateTask({ ...task, completed: newCompleted });
        }}
      />

      <TaskTitle
        title={task.title}
        handleUpdateTaskTitle={async (newTitle) => {
          await handleUpdateTask({ ...task, title: newTitle });
        }}
      />

      {/* Dropdown */}
      <div className="flex justify-end gap-0.5">
        {isAllTasks && (
          <SelectTaskGroup
            task={task}
            taskGroups={taskGroups}
            handleUpdateTaskGroup={handleUpdateTaskGroup}
            className="w-min text-xs select-bordered my-auto"
          />
        )}

        {/* Raw Edit */}
        {false && (
          <button className={toolbarBtnClass + " text-gray-500 !pl-4"}>
            <FaEdit size={20} />
          </button>
        )}

        {/* Schedule */}
        {false && (
          <button className={"!px-3 " + toolbarBtnClass}>
            <SiClockify size={20} />
          </button>
        )}

        {/* Options */}
        <TaskDropdown
          task={task}
          handleDeleteTask={handleDeleteTask}
          taskGroups={taskGroups}
        >
          <div
            role="button"
            className={"text-gray-500 focus:text-info " + toolbarBtnClass}
            tabIndex={0}
          >
            <FaCaretDown size={22} />
          </div>
        </TaskDropdown>
      </div>
    </div>
  );
};
