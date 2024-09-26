"use client";
import { usePathname } from "next/navigation";
import { AiFillControl } from "react-icons/ai";
import { BsDpadFill } from "react-icons/bs";
import { IoMdBarcode } from "react-icons/io";
import { LuTowerControl } from "react-icons/lu";
import { RiRemoteControl2Fill } from "react-icons/ri";
import { twJoin, twMerge } from "tailwind-merge";
import { navbarButtons } from "./navbar";

const iconsMap = [
  AiFillControl,
  LuTowerControl,
  RiRemoteControl2Fill,
  BsDpadFill,
  IoMdBarcode,
];

export const TopBar = () => {
  const pathname = usePathname();
  const pathData = navbarButtons.find((b) => b.path === pathname);

  //   Pick a random icon
  const Icon = iconsMap[Math.floor(Math.random() * iconsMap.length)];

  return (
    <div
      className={twMerge(
        "text-lg text-center",
        "mb-4 border-b-2 bg-base-300 border-base-200",
        `border-${pathData?.color}`,
        "flex flex-row justify-between items-center"
      )}
    >
      <div
        className={
          "text-white bg-base-100 px-4 pt-3 pb-2 flex flex-row items-center gap-2"
        }
      >
        <Icon size={24} />
        Dashboard
      </div>
      <div className={twJoin("px-4 pt-3 pb-2", `bg-${pathData?.color}`)}>
        {pathData?.title}
      </div>
    </div>
  );
};
