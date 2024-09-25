import { AppQueryKeys } from "@/src/utils";
import { TodoGroup } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { twJoin } from "tailwind-merge";

export const TaskGroupTab = ({
  title,
  selected,
  onClick,
  onUpdateText,
  onDeleteGroup,
}: {
  title: string | JSX.Element;
  selected?: boolean;
  onClick: () => void;
  onUpdateText: (text: string) => Promise<TodoGroup | void>;
  onDeleteGroup: () => Promise<void>;
}) => {
  const queryClient = useQueryClient();

  const handleDeleteGroup = async () => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    await onDeleteGroup();
    queryClient.invalidateQueries({ queryKey: AppQueryKeys.todoGroups });
  };
  return (
    <a
      role="tab"
      className={twJoin(
        "tab transition bg-base-200 flex flex-row justify-between px-4 gap-4 max-w-[400px] w-fit",
        selected && "tab-active !bg-info"
      )}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div
        className="flex-1"
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onUpdateText(e.currentTarget.innerText);
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => {
          if (!e.currentTarget.innerText) return;
          if (e.currentTarget.innerText === title) return;

          onUpdateText(e.currentTarget.innerText);
        }}
      >
        {title}
      </div>
      <MdDelete onClick={handleDeleteGroup} />
    </a>
  );
};
