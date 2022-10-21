import create from "zustand";

const useStore = create((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  hoverFactor: 0,
  setHoverFactor: (amount) => set({ hoverFactor: amount }),
}));

export default useStore;
