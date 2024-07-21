import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { BASE_URL } from "../../constants/base_url";
import { useAuth } from "../Auth/AuthContext";
import { CartItem } from "../../types/cartcontext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmounds, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Failed to fetch user cart. Please try again");
      }

      const cart = await response.json();

      const cartItemsMapped = cart.item.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({
          product,
          quantity,
          unitprice,
        }: {
          product: any;
          quantity: number;
          unitprice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitprice,
        })
      );

      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmounds);
    };

    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart");
      }

      const cart = await response.json();

      if (!cart) {
        setError("Failed to parse cart data");
      }

      const cartItemsMapped = cart.item.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ product, quantity , unitprice }: { product: any; quantity: number , unitprice: number }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitprice,
        })
      );

      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmounds);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmounds,
        addItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;