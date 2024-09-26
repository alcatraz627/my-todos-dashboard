"use client";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const LocalStorageKeys = {
  SelectedTaskGroup: "SelectedTaskGroup",
};

let selectedTaskGroupAtom: ReturnType<
  typeof atomWithStorage<string | null>
> | null = null;

const createAtom = () => {
  selectedTaskGroupAtom = atomWithStorage<string | null>(
    LocalStorageKeys.SelectedTaskGroup,
    null
  );

  return selectedTaskGroupAtom;
};

const getAtom = () => {
  if (!selectedTaskGroupAtom) {
    selectedTaskGroupAtom = createAtom();
  }

  return selectedTaskGroupAtom;
};

export const useSelectedTaskGroup = () => useAtom(getAtom());

export const _defaultTaskGroup = "_all";
