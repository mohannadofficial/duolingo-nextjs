import { create } from "zustand";

type PracticeState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const usePracticeModal = create<PracticeState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
