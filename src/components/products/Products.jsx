import axios from "axios";
import { useQuery } from "react-query";
import "react-loader-spinner";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../context/cartContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./products.css";
import $ from "jquery";
import { wishContext } from "../context/wishListContext";
export default function Products() {
  const productsNavigate = useNavigate();
  const { cId, bId } = useParams();
  const { addToWishlist, deleteFromWish, savedId } = useContext(wishContext);
  const { data, isLoading } = useQuery("products", getProducts, {
    cacheTime: 0,
  });
  function getProducts() {
    try {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?sort=-price&${
          cId ? `category[in]=${cId}` : ""
        }&${bId ? `brand=${bId}` : ""}`
      );
    } catch (ex) {
      console.log(ex);
    }
  }
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
  async function addToWish(id) {
    try {
      const responseData = await addToWishlist(id);
      if (responseData.status == "success") {
        toast.success("Product Added To Saved Items", {
          duration: 1000,
          position: "top-right",
        });
      } else {
        toast.error("Faild To Save Product", { position: "top-right" });
      }
    } catch (e) {
      toast.error("Error", { position: "top-right" });
    }
  }
  async function removeFromWish(id) {
    try {
      const responseData = await deleteFromWish(id);
      if (responseData.status == "success") {
        toast.success("Product Removed From Saved Items", {
          duration: 1000,
          position: "top-right",
        });
      } else {
        toast.error("Faild To Remove Product", { position: "top-right" });
      }
    } catch (e) {
      toast.error("Error", { position: "top-right" });
    }
  }
  function addCart(e, pId) {
    if (
      !$(e.target).hasClass("addToCart") &&
      !$(e.target).hasClass("wishBtn")
    ) {
      productsNavigate(`/productDetails/${pId}`);
    }
  }
  return (
    <>
      <title>Products</title>
      {isLoading ? (
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
      ) : (
        <>
          <div className="container p-4">
            <div className="row gy-4 mb-5">
              {data?.data.data.length > 0 ? (
                <>
                  {data?.data.data.map((product) => {
                    return (
                      <div key={product._id} className="col-md-3">
                        <div
                          data-id={product._id}
                          onClick={(e) => addCart(e, product._id)}
                          className="cardItem cursor-pointer rounded-3 p-1 d-flex flex-column"
                        >
                          <div className="image mb-2">
                            <img
                              src={product.imageCover}
                              alt=""
                              className="w-100"
                            />
                          </div>
                          <div className="head d-flex justify-content-between align-items-center">
                            <h5 className="category mainColor">
                              {product.category.name}
                            </h5>
                            {savedId ? (
                              savedId.includes(product._id) ? (
                                <i
                                  onClick={() => removeFromWish(product._id)}
                                  className="wishBtn fa-solid fa-heart fs-5 me-2 mainColor"
                                ></i>
                              ) : (
                                <i
                                  onClick={() => addToWish(product._id)}
                                  className="wishBtn fa-regular fa-heart fs-5 me-2 mainColor"
                                ></i>
                              )
                            ) : (
                              <i
                                onClick={() => addToWish(product._id)}
                                className="wishBtn fa-regular fa-heart fs-5 me-2 mainColor"
                              ></i>
                            )}
                          </div>
                          <h6 className="title">
                            {product.title.split("").slice(0, 25).concat("...")}
                          </h6>
                          <div className="info d-flex justify-content-between">
                            <span className="price">{product.price} EGP</span>
                            <div className="rate">
                              <i
                                className="fa fa-star me-1"
                                style={{ color: "#ffc908" }}
                              />
                              <span>{product.ratingsAverage}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              addProduct(product._id);
                            }}
                            className="addToCart btn btn-success my-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-center align-items-center flex-column p-5">
                    <i className="fa-regular fa-face-frown fa-5x mb-4"></i>
                    <h3>
                      Sorry, There's No Products in this Category Right Now.
                    </h3>
                  </div>
                </>
              )}
            </div>
            {/* <div className="pagination d-flex justify-content-center align-items-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <span
                      onClick={() => {
                        refetch();
                        getProducts(1);
                      }}
                      className="page-link cursor-pointer"
                    >
                      1
                    </span>
                  </li>
                  <li className="page-item">
                    <span
                      onClick={() => {
                        refetch();
                        getProducts(2);
                      }}
                      className="page-link cursor-pointer"
                    >
                      2
                    </span>
                  </li>
                  <li className="page-item">
                    <span
                      onClick={() => {
                        getProducts(3);
                        refetch();
                      }}
                      className="page-link cursor-pointer"
                    >
                      3
                    </span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        </>
      )}
    </>
  );
}
