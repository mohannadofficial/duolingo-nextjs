import { create } from "zustand";

type ExitModelState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useExitModal = create<ExitModelState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
