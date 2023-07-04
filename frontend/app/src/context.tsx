import React, { createContext, useEffect, useState } from "react";
import { Product } from "./entities";

const Context = createContext({} as any);

const ContextProvider = ({ children }: any) => {
  const [cart, setCart] = useState<Product[] | []>(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const contextValue = {
    cart,
    setCart,
  }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
};

export { Context, ContextProvider };