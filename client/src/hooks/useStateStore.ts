import { create } from "zustand";

interface State {
  cartState: boolean;
  setCartState: (cartState: boolean) => void;
}

const useStateStore = create<State>((set) => ({
  cartState: false,
  setCartState: (cartState: boolean) => set({ cartState }),
}));

export default useStateStore;
