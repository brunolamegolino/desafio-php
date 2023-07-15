import { createContext, useEffect, useState } from "react";
import { Product, ProductType } from "./entities";
import { VariantType, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Context = createContext({} as any);

const ContextProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [cart, setCart] = useState<Product[] | []>(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : []);

  useEffect(() => {
    (async () => {if (productTypes.length === 0) await getProductTypes()})()
  }, [productTypes]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const notify = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { 
      variant: variant, 
      autoHideDuration: 5000,
      anchorOrigin: { vertical: 'top', horizontal: 'center' }});
  }

  const confirmPurchase = async(total: Number) => {
    notify('Completing purchase', 'info')
    try {
    const response = await fetch('http://localhost:8080/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        products: cart,
        total: total})
      })

    const data = await response.json()
    if (!data.id) throw new Error()
    notify('Purchase completed successfully', 'success')
    setCart([])
    navigate('/')
    } catch (error) {
      notify('Error completing purchase', 'error')
    }
  }

  const addToCartHandler = (product: Product) => {
    const index = cart.findIndex((item: Product) => item.id === product.id)
    if (index >= 0) {
      cart[index].quantity += 1
    } else {
      product.quantity = 1;
      (cart as Product[]).push(product);
    }
    setCart([...cart])
  }


  const deleteHandler = (product: Product) => {
    const index = cart.findIndex((item: Product) => item.id === product.id)
    cart[index].quantity === 1
      ? cart.splice(index, 1)
      : cart[index].quantity -= 1
    setCart([...cart])
  }

  const getProductTypes = async () => {
    console.log('getProductTypes')
    try {
      const response = await fetch('http://localhost:8080/product-type')
      const data = await response.json()
      setProductTypes(data as ProductType[])
    } catch (error) {
      console.log(error)
    }
  }

  const contextValue = {
    cart,
    setCart,
    confirmPurchase,
    addToCartHandler,
    deleteHandler,
    productTypes,
    notify,
  }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
};

export { Context, ContextProvider };