import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const wishContext = createContext();
export default function WishContextProvider({ children }) {
  const [wishCount, setWishCount] = useState(0);
  const [wishList, setWishList] = useState(null);
  const [savedId, setSavedId] = useState(null);
  async function addToWishlist(id) {
    const { data } = await axios.post(
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
    try {
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
      let savedItems = data?.data.map((savedItem) => savedItem._id);
      setSavedId(savedItems);
      return data;
    } catch (error) {
      console.log("Error");
    }
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
        savedId,
      }}
    >
      {children}
    </wishContext.Provider>
  );
}
