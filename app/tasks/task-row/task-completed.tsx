"use client";
import { useIsMounted } from "@/src/utils/ssr";
import { useState } from "react";

export const TaskCompleted = ({
  completed,
  handleUpdateTaskCompleted,
}: {
  completed: boolean;
  handleUpdateTaskCompleted: (newCompleted: boolean) => Promise<void>;
}) => {
  const isMounted = useIsMounted();
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleUpdate = (newVal: boolean) => {
    setIsCompleted(newVal);
    handleUpdateTaskCompleted(newVal);
  };

  return (
    <input
      type="checkbox"
      className="checkbox checkbox-primary checkbox-lg"
      defaultChecked={isCompleted}
      readOnly={!isMounted}
      onChange={(e) => handleUpdate(e.target.checked)}
    />
  );
};
