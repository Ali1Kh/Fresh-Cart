import React, { useContext, useState } from "react";
import "./cart.css";
import { cartContext } from "../context/cartContext";
import { BallTriangle, MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
export default function Cart() {
  const {
    cardItems,
    cardItemsCount,
    totalCartPrice,
    updateProduct,
    deleteProduct,
  } = useContext(cartContext);
  const [isLoading, setLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  async function updateQuantity(id, count) {
    setLoading(true);
    const res = await updateProduct(id, count);
    if (res.status == "success") {
      toast.success("Item Quantity has been Updated");
    } else {
      toast.error("Failed To Update Quantity");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  async function deleteProductItem(id) {
    setDeleteLoading(true);
    const res = await deleteProduct(id);
    if (res.status == "success") {
      toast.success("Product Deleted Successfuly");
    } else {
      toast.error("Failed To Delete Product");
    }
    setTimeout(() => {
      setDeleteLoading(false);
    }, 1000);
  }

  return (
    <>
      {cardItems ? (
        <>
          <title>Cart</title>
          <section className="container p-4 my-3 lightColorBg rounded-1 ">
            <div className="row gy-3">
              <div className="col-md-9">
                <div className="shoppingCart p-3 h-100 bg-white rounded-3">
                  {cardItems.products.length > 0 ? (
                    <>
                      <h4 className="mb-3">Shopping Cart :</h4>
                      {cardItems.products.map((product, idx) => {
                        return product ? (
                          <div
                            key={idx}
                            className="cartItem border-top border-1 pt-3 mt-3"
                          >
                            <div className="row">
                              <div className="col-md-10">
                                <div className="row">
                                  <div className="col-md-2">
                                    <div className="Image">
                                      <img
                                        className="w-100"
                                        src={product.product.imageCover}
                                        alt="product"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-10">
                                    <div className="info">
                                      <Link
                                        to={`/productDetails/${product.product._id}`}
                                      >
                                        {product.product.title}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <h6>EGP {product.price}</h6>
                              </div>
                            </div>
                            <div className="options px-2 mt-3 d-flex justify-content-between align-items-center">
                              <div className="removeItem">
                                <button
                                  onClick={() => {
                                    deleteProductItem(product.product._id);
                                  }}
                                  className="btn border-0 mainColor"
                                >
                                  {isDeleteLoading ? (
                                    <div
                                      className="spinner-border spinner-border-sm mainColor"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  ) : (
                                    <>
                                      <i className="fa-solid fa-trash-can"></i>{" "}
                                      Remove
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="itemQuantity">
                                <button
                                  onClick={() => {
                                    updateQuantity(
                                      product.product._id,
                                      product.count + 1
                                    );
                                  }}
                                  className="borderMainColor mainColor border-1 rounded-2"
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                                <span className="quantity mx-2">
                                  {isLoading ? (
                                    <div
                                      className="spinner-border spinner-border-sm mainColor"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Loading...
                                      </span>
                                    </div>
                                  ) : (
                                    product.count
                                  )}
                                </span>
                                <button
                                  onClick={() => {
                                    updateQuantity(
                                      product.product._id,
                                      product.count - 1
                                    );
                                  }}
                                  className="borderMainColor mainColor border-1 rounded-2"
                                  disabled={product.count <= 1 ? true : false}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          "A7a"
                        );
                      })}
                    </>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center p-3">
                      <i class="fa-solid fa-cart-plus fa-5x mainColor mb-3"></i>
                      <h3>Your Card Is Empty</h3>
                      <p>Browse our categories and discover our best deals!</p>
                      <Link to={"/home"} className="btn mainColorBg text-white">Browse</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="checkOut p-3 bg-white rounded-3">
                  <h4 className="mb-3">Cart Summary</h4>
                  <div className="total border-top border-bottom py-3 d-flex justify-content-between align-items-center">
                    <span className="h6 m-0">Total:</span>
                    <span className="h6 m-0">EGP {totalCartPrice}</span>
                  </div>
                  <button className="btn w-100 mt-3 borderMainColor">
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="vh-100 p-0  d-flex justify-content-center align-items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </div>
      )}
    </>
  );
}
