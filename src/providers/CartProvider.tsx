import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: string, quantity: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const item = items.find(
      (i) => i.product_id === product.id && i.size === size
    );
    if (item) {
      updateQuantity(item.id, 1);
    } else {
      setItems([
        ...items,
        {
          id: randomUUID(),
          product,
          product_id: product.id,
          size,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, quantity: -1 | 1) => {
    setItems(
      items
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + quantity } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
