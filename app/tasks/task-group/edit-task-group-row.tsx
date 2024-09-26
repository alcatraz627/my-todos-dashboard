import { PatchPayloadWithId } from "@/app/api/api-utils";
import { TodoGroup } from "@prisma/client";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import { twJoin, twMerge } from "tailwind-merge";

export const EditTaskGroupRow = ({
  taskGroup,
  handleUpdate,
  handleDelete,
  isSingleEntity,
  isInFocus,
}: {
  taskGroup: TodoGroup;
  handleUpdate: (
    newData: PatchPayloadWithId<TodoGroup>
  ) => Promise<TodoGroup | void>;
  handleDelete: () => Promise<void>;
  isSingleEntity?: boolean;
  isInFocus: boolean;
}) => {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={twMerge(
        "px-2 flex flex-row items-center justify-between mb-2 mt-2",
        isInFocus && "opacity-50"
      )}
    >
      <span
        className={twJoin(
          "badge relative border-neutral border-2 bg-neutral badge-sm",
          `bg-[${taskGroup.color}]`
        )}
      />
      <div
        ref={titleRef}
        className="ml-0 mr-auto px-2 min-w-[20ch] max-w-[70vw]"
        contentEditable
        suppressContentEditableWarning
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleUpdate({
              id: taskGroup.id,
              title: e.currentTarget.innerText,
            });
            e.currentTarget.parentElement?.parentElement?.focus?.();
          }
        }}
        onBlur={() => {
          if (!titleRef.current) return;
          const currTextVal = titleRef.current.innerHTML;

          if (!currTextVal) return;
          if (currTextVal === taskGroup.title) return;

          handleUpdate({
            id: taskGroup.id,
            title: currTextVal,
          });
        }}
      >
        {taskGroup.title}
      </div>
      <div
        className={twJoin(
          "px-0 text-lg cursor-pointer hover:opacity-70 transition",
          isSingleEntity ? "text-error" : "text-neutral"
        )}
      >
        <MdDelete className="" onClick={() => handleDelete()} />
      </div>
    </div>
  );
};
