import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartcontext";


interface CartContextType {
  cartItems: CartItem[];
  totalAmounds: number;
  addItemToCart: (productId: string) => void;
  updatequantity: (productId: string , quantity: number) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  totalAmounds: 0,
  addItemToCart: () => {},
  updatequantity: () => {},
});

export const useCart = () => useContext(CartContext);