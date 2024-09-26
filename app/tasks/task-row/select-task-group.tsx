import { Todo, TodoGroup } from "@prisma/client";
import { twMerge } from "tailwind-merge";

export const SelectTaskGroup = ({
  task,
  handleUpdateTaskGroup,
  taskGroups,
  className,
}: {
  task: Todo;
  handleUpdateTaskGroup: (data: {
    taskId: string;
    groupId: string;
  }) => Promise<void>;
  taskGroups: TodoGroup[];
  className?: string;
}) => {
  return (
    <select
      className={twMerge("select select-sm ml-[-10px]", className)}
      value={task.todoGroupId || ""}
      onChange={(e) => {
        handleUpdateTaskGroup({
          taskId: task.id,
          groupId: e.target.value,
        });
      }}
    >
      <option>None</option>
      {taskGroups.map((taskGroup) => (
        <option key={taskGroup.id} value={taskGroup.id}>
          {taskGroup.title}
        </option>
      ))}
    </select>
  );
};
