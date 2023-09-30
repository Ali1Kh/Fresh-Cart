import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const wishContext = createContext();
export default function WishContextProvider({ children }) {
  const [wishCount, setWishCount] = useState(0);
  const [wishList, setWishList] = useState(null);
  async function addToWishlist(id) {
    const data = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist/`,
      {
        productId: id,
      },
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    getWishlist();
    return data;
  }
  async function getWishlist() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    setWishCount(data.count);
    setWishList(data.data);
    return data;
  }
  async function deleteFromWish(id) {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token: localStorage.getItem("Token"),
        },
      }
    );
    getWishlist();
    return data;
  }

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      getWishlist();
    }
  }, []);

  return (
    <wishContext.Provider
      value={{
        getWishlist,
        addToWishlist,
        deleteFromWish,
        wishList,
        wishCount,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
