import { CartState, ProductInfo } from "@/interfaces/interface";
import { StateCreator } from "zustand";
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface CartPersist {
  (
    config: StateCreator<CartState>,
    options: PersistOptions<CartState>,
  ): StateCreator<CartState>;
}

const useCartStore = create<CartState>(
  (persist as CartPersist)(
    (set) => ({
      cart: [],
      itemsPrice: 0,

      addToCart: (item: ProductInfo) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === item._id,
          );
          let newCart;
          let newTotalPrice = state.itemsPrice;

          if (existingItem) {
            newCart = state.cart.map((cartItem) =>
              cartItem._id === item._id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                    totalProductPrice:
                      (cartItem.quantity + 1) * (cartItem.price || 0),
                  }
                : cartItem,
            );
            newTotalPrice += item.price || 0;
          } else {
            newCart = [
              ...state.cart,
              { ...item, quantity: 1, totalProductPrice: item.price || 0 },
            ];
            newTotalPrice += item.price || 0;
          }

          return { cart: newCart, itemsPrice: newTotalPrice };
        }),

      removeCart: (itemId: string) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item._id === itemId);
          if (existingItem) {
            let newCart;
            let newTotalPrice = state.itemsPrice;

            if (existingItem.quantity > 1) {
              newCart = state.cart.map((item) =>
                item._id === itemId
                  ? {
                      ...item,
                      quantity: item.quantity - 1,
                      totalProductPrice:
                        (item.quantity - 1) * (item.price || 0),
                    }
                  : item,
              );
              newTotalPrice -= existingItem.price || 0;
            } else {
              newCart = state.cart.filter((item) => item._id !== itemId);
              newTotalPrice -= existingItem.price || 0;
            }

            return { cart: newCart, itemsPrice: newTotalPrice };
          }
          return state;
        }),

      clearCart: () => set({ cart: [], itemsPrice: 0 }),
    }),
    {
      name: "cart",
      getStorage: () => localStorage,
    },
  ),
);

export default useCartStore;
