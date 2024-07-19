import { createContext, useContext } from "react";
import { CartItem } from "../../types/cartcontext";


interface CartContext {
    cartItems: CartItem[];
    TotalAmount: number;
    addToCart: (productId: string) => void;
}

export const CartContext = createContext<CartContext>({
    cartItems: [],
    TotalAmount:0,
    addToCart: () => {}
})

// eslint-disable-next-line react-hooks/rules-of-hooks
export const userCart = () => useContext(CartContext);

