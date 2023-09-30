import React, { useContext } from "react";
import { cartContext } from "../context/cartContext";
import $ from "jquery";
import axios from "axios";
import toast from "react-hot-toast";
export default function Checkout() {
  const { cartId, clearCart } = useContext(cartContext);

  async function order() {
    const shippingAddress = {
      details: $("#details").val(),
      phone: $("#phone").val(),
      city: $("#city").val(),
    };

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingAddress,
        { headers: { token: localStorage.getItem("Token") } }
      );
      if (data.status == "success") {
        toast.success("Order Sent Successfuly");
        clearCart();
      } else {
        toast.error("Failed To Sent Order");
      }
    } catch (error) {
      console.log("Error");
    }
  }

  return (
    <div className="container p-5">
      <form action="">
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="City"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">
            Details
          </label>
          <textarea
            className="form-control"
            id="details"
            rows="3"
            style={{ maxHeight: "150px" }}
            placeholder="Details"
          ></textarea>
        </div>
        <button
          className="btn mainColorBg text-white"
          type="button"
          onClick={order}
        >
          Order
        </button>
      </form>
    </div>
  );
}
