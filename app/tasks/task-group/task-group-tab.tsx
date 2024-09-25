import { twJoin } from "tailwind-merge";

export const TaskGroupTab = ({
  title,
  selected,
  onClick,
}: {
  title: string | JSX.Element;
  selected?: boolean;
  onClick: () => void;
}) => {
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
      <div className="flex-1">{title}</div>
    </a>
  );
};
