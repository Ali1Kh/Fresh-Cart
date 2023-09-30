import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [cardItems, setCardItems] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cardItemsCount, setCardItemsCount] = useState(0);
  const [cartId, setCartId] = useState(null);
  async function addToCart(id) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      getCartData();
      return data;
    } catch (ex) {
      console.log("Error", ex);
    }
  }
  async function getCartData() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      setCardItems(data.data);
      setCardItemsCount(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("Token")) {
     getCartData();
    }
  }, []);

  async function updateProduct(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      getCartData();
      return data;
    } catch (ex) {
      console.log("Error", ex);
    }
  }

  async function deleteProduct(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      getCartData();
      return data;
    } catch (ex) {
      console.log("Error", ex);
      <Navigate to={"/home"} />;
    }
  }
  async function clearCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );
      setCardItemsCount(0);
      setTotalCartPrice(0);
      setCardItems(true);
      return data;
    } catch (ex) {
      console.log("Error", ex);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCartData,
        updateProduct,
        deleteProduct,
        clearCart,
        cardItems,
        cardItemsCount,
        totalCartPrice,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
