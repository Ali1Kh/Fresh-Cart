import React, { useContext } from "react";
import { wishContext } from "../context/wishListContext";
import { Link } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import toast from "react-hot-toast";
export default function Wishlist() {
  const { wishList, wishCount, deleteFromWish } = useContext(wishContext);
  const { addToCart } = useContext(cartContext);
  async function addProduct(id) {
    try {
      const responseData = await addToCart(id);
      if (!responseData) {
        toast.error("Error", { position: "top-right" });
      } else if (responseData.status == "success") {
        toast.success("Product Added To Cart Successfully", {
          duration: 1000,
          position: "top-right",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteSavedItem(id) {
    try {
      const responseData = await deleteFromWish(id);
      if (!responseData) {
        toast.error("Error", { position: "top-right" });
      } else if (responseData.status == "success") {
        toast.success("Product Removed From Saved Item", {
          duration: 1000,
          position: "top-right",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <title>Saved Items</title>
      <div className="container">
        <div className="inner shadow-lg rounded-3 my-4 p-4">
          <div className="title border-bottom mb-2 p-1 pb-2">
            <h5>Saved Items ({wishCount}) :</h5>
          </div>
          {wishList
            ? wishList.map((savedItem, idx) => {
                return (
                  <div
                    key={idx}
                    className="savedItem border rounded-3 p-3 mb-3"
                  >
                    <div className="row">
                      <div className="col-md-10">
                        <div className="row">
                          <div className="col-md-2">
                            <img
                              className="w-100"
                              src={savedItem.imageCover}
                              style={{ height: "150px" }}
                              alt=""
                            />
                          </div>
                          <div className="col-md-10 d-flex flex-column">
                            <Link
                              to={`/productDetails/${savedItem._id}`}
                              className="title"
                            >
                              {savedItem.title}
                            </Link>
                            <div className="description text-muted mb-1">
                              {savedItem.description
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")
                                .concat("...")}
                            </div>
                            <div className="category">
                              <p className="mainColor m-0">
                                {" "}
                                {savedItem.category.name}
                              </p>
                            </div>
                            <div className="price mt-auto">
                              <p>Price : {savedItem.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex flex-column justify-content-between py-3">
                        <button
                          onClick={() => {
                            addProduct(savedItem._id);
                          }}
                          className="btn btn-success my-2"
                        >
                          Add To Cart
                        </button>
                        <div className="removeItem w-100">
                          <button
                            onClick={() => {
                              deleteSavedItem(savedItem._id);
                            }}
                            className="btn w-100 border-0 mainColor"
                          >
                            <i className="fa-solid fa-trash-can me-2"></i>
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}
