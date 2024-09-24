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
    if (!isMounted) return;
    setIsCompleted(newVal);
    handleUpdateTaskCompleted(newVal);
  };

  return (
    <input
      type="checkbox"
      className="checkbox checkbox-primary checkbox-lg"
      checked={isCompleted}
      disabled={!isMounted}
      onChange={(e) => handleUpdate(e.target.checked)}
    />
  );
};
