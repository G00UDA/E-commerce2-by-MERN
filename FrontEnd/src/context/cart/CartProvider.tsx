import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/cartcontext";



const CartProvider: FC<PropsWithChildren> = ({children})=>{

    const [cartItem , setcartItem] = useState<CartItem[]>([]);
    const [TotalAmount , setTotalAmount] = useState<number>();
    const addToCart = (productId:string) => {
        console.log(productId);
    }

    return(
        <CartContext.Provider value={{cartItem , TotalAmount , addToCart}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider