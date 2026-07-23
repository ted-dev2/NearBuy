"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { CartItem } from "@/types/cart";
import type { FulfillmentType, ShippingAddress } from "@/types/database";

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: { id: string; title: string; price: number; image_url: string | null }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  fulfillmentType: FulfillmentType;
  setFulfillmentType: (type: FulfillmentType) => void;
  shippingAddress: ShippingAddress;
  setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>;
  email: string;
  setEmail: (email: string) => void;
};

const defaultShippingAddress: ShippingAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "US",
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>("pickup");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(defaultShippingAddress);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("nearbuy_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    const savedEmail = localStorage.getItem("nearbuy_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("nearbuy_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save email to localStorage
  useEffect(() => {
    localStorage.setItem("nearbuy_email", email);
  }, [email]);

  const addToCart = (product: { id: string; title: string; price: number; image_url: string | null }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevItems,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.image_url,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true); // Open the cart sidebar when an item is added for nice mobile UX
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fulfillmentType,
        setFulfillmentType,
        shippingAddress,
        setShippingAddress,
        email,
        setEmail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
