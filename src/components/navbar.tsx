"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaCalendarDays, FaCircleCheck } from "react-icons/fa6";
import { MdCalendarViewDay, MdNotes, MdSettings } from "react-icons/md";
import { twJoin } from "tailwind-merge";

interface NavbarButton {
  title: string;
  path: string;
  icon: IconType;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "error"
    | "neutral"
    | "warning"
    | "ghost";
}

export const navbarButtons: NavbarButton[] = [
  {
    title: "Day",
    icon: MdCalendarViewDay,
    path: "/day",
    color: "error",
  },
  {
    title: "Calendar",
    icon: FaCalendarDays,
    path: "/calendar",
    color: "success",
  },
  {
    title: "Tasks",
    icon: FaCircleCheck,
    path: "/tasks",
    color: "info",
  },
  {
    title: "Notes",
    icon: MdNotes,
    path: "/notes",
    color: "secondary",
  },
  {
    title: "Preferences",
    icon: MdSettings,
    path: "/settings",
    color: "neutral",
  },
];

export const Navbar = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="navbar btm-nav bg-base-100 align-stretch gap-2 h-fit max-w-screen-md mx-auto relative">
      {navbarButtons.map(({ path, icon: Icon, color, title }, idx) => (
        <div key={idx}>
          <Link
            href={path}
            className={twJoin(
              "btn btn-block btn-md",
              isLoading && "btn-disabled btn-outline",
              `btn-${color || "info"}`
            )}
          >
            <Icon size={24} />
          </Link>
          <span className="text-xs text-white">{title}</span>
        </div>
      ))}
    </div>
  );
};
