import { create } from "zustand";

type HeartsModelState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useHeartsModal = create<HeartsModelState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
