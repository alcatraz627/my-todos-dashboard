import { Todo } from "@prisma/client";
import { ImBoxRemove } from "react-icons/im";
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
  return (
    <div className="dropdown dropdown-end">
      {children}
      <ul
        className="dropdown-content menu bg-base-100 rounded-box z-[1] min-w-lg w-[30vw] max-w-xl p-2 shadow border-2 border-info"
        tabIndex={0}
      >
        <li>
          <a className="px-3">
            <ImBoxRemove size={18} className="pb-1" />
            Move To
          </a>
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
