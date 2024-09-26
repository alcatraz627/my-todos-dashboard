import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const LocalStorageKeys = {
  SelectedTaskGroup: "SelectedTaskGroup",
};

const selectedTaskGroup = atomWithStorage<string | null>(
  LocalStorageKeys.SelectedTaskGroup,
  null
);

export const useSelectedTaskGroup = () => useAtom(selectedTaskGroup);
