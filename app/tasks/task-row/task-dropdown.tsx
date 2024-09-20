import { Todo } from "@prisma/client";
import { FaCaretDown } from "react-icons/fa6";
import { ImBoxRemove } from "react-icons/im";
import { MdDelete } from "react-icons/md";

export const TaskDropdown = ({
  task,
  handleDeleteTask,
}: {
  task: Todo;
  handleDeleteTask: (id: string) => Promise<void>;
}) => {
  return (
    <div className="dropdown dropdown-end">
      <div role="button" className="m-1 text-gray-500" tabIndex={0}>
        <FaCaretDown size={20} />
      </div>
      <ul
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[60svw] p-2 shadow"
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
