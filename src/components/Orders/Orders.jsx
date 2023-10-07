import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Orders() {
  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem("Token"));
    getOrders(id);
  }, []);

  const [orders, setOrders] = useState(null);
  async function getOrders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        { headers: { token: localStorage.getItem("Token") } }
      );
      setOrders(data);
      console.log(data, "?");
    } catch (error) {
      console.log("Error");
    }
  }

  return (
    <>
      <title>Orders</title>
      {orders ? (
        <>
          <div className="container">
            <div className="inner shadow-lg rounded-3 my-4 p-4">
              {orders.length > 0 ? (
                <>
                  <div className="title border-bottom mb-2 p-1 pb-2">
                    <h5>Order's :</h5>
                  </div>
                  {orders.map((order, idx) => {
                    return (
                      <div
                        key={idx}
                        className="border-bottom border-2 p-1 mb-3"
                      >
                        <h5 className="mb-3">Order Num : {idx + 1}</h5>
                        <div className="row">
                          <div className="col-md-8">
                            {order.cartItems.map((orderProduct, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className="orderProduct border rounded-3 p-3 mb-3"
                                >
                                  <div className="row">
                                    <div className="col-md-10">
                                      <div className="row">
                                        <div className="col-md-3">
                                          <img
                                            className="w-100"
                                            src={
                                              orderProduct.product.imageCover
                                            }
                                            // style={{ height: "150px" }}
                                            alt=""
                                          />
                                        </div>
                                        <div className="col-md-9 d-flex flex-column">
                                          <Link
                                            to={`/productDetails/${orderProduct.product._id}`}
                                            className="title"
                                          >
                                            {orderProduct.product.title}
                                          </Link>
                                          <div className="category">
                                            <p className="mainColor m-0">
                                              {" "}
                                              {
                                                orderProduct.product.category
                                                  .name
                                              }
                                            </p>
                                          </div>
                                          <div className="quantity">
                                            <span>Quantity :</span>{" "}
                                            {orderProduct.count}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-2 d-flex flex-column justify-content-between py-3">
                                      <div className="details">
                                        <Link
                                          to={`/productDetails/${orderProduct.product._id}`}
                                          className="title"
                                        >
                                          <button className="btn mb-4 mainColorBg text-white">
                                            Details
                                          </button>
                                        </Link>
                                      </div>
                                      <div className="price mt-auto">
                                        <h6>Price : {orderProduct.price}</h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="col-md-4">
                            <div className="inner border rounded-3 p-3 mb-3">
                              <h5 className="mb-2">
                                Total Order Price : {order.totalOrderPrice}
                              </h5>
                              <div className="h6 mb-3 d-flex gap-2 align-items-center">
                                Payment Method :{" "}
                                <span
                                  className="paymentMethod text-capitalize mainColorBg text-white px-3 py-1 my-1 rounded-pill"
                                  style={{ width: "fit-content" }}
                                >
                                {order.paymentMethodType}
                                </span>
                              </div>
                              <div className="h6">
                                Ordered At : {order.createdAt.split("T")[0]}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="rounded-3 d-flex flex-column align-items-center justify-content-center p-5">
                    <i className="fa-regular fa-face-angry fa-5x mainColor mb-3"></i>
                    <h4>Looks like you haven't placed any Order!</h4>
                    <p>Browse our categories and discover our best deals!</p>
                    <Link to={"/home"} className="btn mainColorBg text-white">
                      Browse
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
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
        </>
      )}
    </>
  );
}
