"use client";
import { useIsMounted } from "@/src/utils/ssr";
import { useState } from "react";

export const TaskTitle = ({
  title,
  handleUpdateTaskTitle,
}: {
  title: string;
  handleUpdateTaskTitle: (title: string) => Promise<void>;
}) => {
  const isMounted = useIsMounted();
  const [editedTitle, setEditedTitle] = useState(title);

  return (
    <input
      type="text"
      placeholder="Type here"
      className="input text-primary-content w-full max-w-xs"
      readOnly={!isMounted}
      value={editedTitle}
      onChange={(e) => {
        if (!isMounted) return;
        setEditedTitle(e.target.value);
      }}
      onBlur={() => handleUpdateTaskTitle(editedTitle)}
    />
  );
};
