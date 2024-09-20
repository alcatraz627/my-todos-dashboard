import { Todo } from "@prisma/client";
import { FaEdit } from "react-icons/fa";
import { SiClockify } from "react-icons/si";
import { twJoin } from "tailwind-merge";
import { TaskCompleted } from "./task-completed";
import { TaskDropdown } from "./task-dropdown";
import { TaskTitle } from "./task-title";

export const TaskRow = ({
  task,
  isInFocus,
  handleUpdateTask,
  handleDeleteTask,
}: {
  task: Todo;
  isInFocus: boolean;
  handleUpdateTask: (task: Todo) => Promise<Todo | void>;
  handleDeleteTask: (id: string) => Promise<void>;
}) => {
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
      <div className="flex justify-end gap-1">
        {/* Raw Edit */}
        <button className="btn btn-link text-gray-500 btn-sm btn-rounded px-1">
          <FaEdit size={20} />
        </button>

        {/* Schedule */}
        <button className="btn btn-link btn-sm btn-rounded px-1">
          <SiClockify size={20} />
        </button>

        {/* Options */}
        <TaskDropdown task={task} handleDeleteTask={handleDeleteTask} />
      </div>
    </div>
  );
};
