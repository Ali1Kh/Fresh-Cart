import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/cartContext";
import $ from "jquery";
import axios from "axios";
import toast from "react-hot-toast";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
  const { cartId, clearCart } = useContext(cartContext);
  const [method, setMethod] = useState("cash");
  const navigateCheckout = useNavigate();
  const handleChange = (event) => {
    setMethod(event.target.value);
  };
  useEffect(() => {
    console.log(cartId);
    console.log(window.location.origin);
  }, []);

  function order() {
    if (method == "cash") {
      cashOrder();
    } else if (method == "card") {
      payment();
    }
  }

  async function cashOrder() {
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
        setTimeout(() => {
          navigateCheckout("/home");
        }, 2000);
        clearCart();
      } else {
        toast.error("Failed To Sent Order");
      }
    } catch (error) {
      toast.error("Failed To Sent Order");
    }
  }
  async function payment() {
    const shippingAddress = {
      details: $("#details").val(),
      phone: $("#phone").val(),
      city: $("#city").val(),
    };
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        shippingAddress,
        { headers: { token: localStorage.getItem("Token") } }
      );
      if (data.status == "success") {
        toast.success("Order Sent Successfuly");
        setTimeout(() => {
          window.open(data.session.url);
        }, 2000);
        clearCart();
      } else {
        toast.error("Failed To Sent Order");
      }
    } catch (error) {
      toast.error("Failed To Sent Order");
    }
  }

  return (
    <>
      <title>Checkout</title>

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
          <div className="method mb-3">
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Payment Method :
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={method}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="cash"
                  control={<Radio />}
                  label="Cash"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Payment Card"
                />
              </RadioGroup>
            </FormControl>
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
    </>
  );
}
