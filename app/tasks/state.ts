import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const LocalStorageKeys = {
  SelectedTaskGroup: "SelectedTaskGroup",
};

const selectedTaskGroupAtom = atomWithStorage<string | null>(
  LocalStorageKeys.SelectedTaskGroup,
  null
);

export const useSelectedTaskGroup = () => useAtom(selectedTaskGroupAtom);

export const _defaultTaskGroup = "_all";
