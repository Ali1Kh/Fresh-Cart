import { useFormik } from "formik";
import React, { useState } from "react";
import "axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let users = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const [message, setMessage] = useState(null);
  const [btnLoad, setBtnLoading] = useState(false);
  const navigateLogin = useNavigate();
  async function signUp(values) {
    setBtnLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
        setMessage("Success");
        setTimeout(() => {
          navigateLogin("/login");
        }, 200);
      } else setMessage("Error");
    } catch (error) {
      setMessage(error.response.data.message);
      formik.resetForm();
    }
    setBtnLoading(false);
  }
  const formik = useFormik({
    initialValues: users,
    onSubmit: signUp,
    validate(values) {
      setMessage(null);
      let errors = {};
      if (!values.name.match(/^[a-zA-Z\s]{3,}$/)) {
        errors.name = "Name Must Be Charchters , At least 3 Charchters";
      }
      if (
        !values.email.match(
          /^[a-zA-Z]{1,}[a-zA-Z0-9]{2,15}@[a-z]{3,15}\.[a-z]{3,9}$/
        )
      ) {
        errors.email = "Email Is Invaild";
      }
      if (!values.password.match(/^[A-Za-z][\w|$#!]{7,24}$/)) {
        errors.password = "Password Must Be More Than 8 Charchters";
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "Check Your RePassword";
      }
      if (!values.phone.match(/^(01)(0|1|2|5)[0-9]{8}$/)) {
        errors.phone = "Phone is Invalid";
      }
      return errors;
    },
  });
  return (
    <>
      <title>Register</title>
      <section className="register p-5">
        <div className="container">
          <h2 className="mb-4">Register Now :</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
              ></input>
              <label htmlFor="name">Name</label>
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger">{formik.errors.name}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              ></input>
              <label htmlFor="email">Email address</label>
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              ></input>
              <label htmlFor="password">Password</label>
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                className="form-control"
                id="rePassword"
                placeholder="rePassword"
              ></input>
              <label htmlFor="rePassword">rePassword</label>
              {formik.errors.rePassword && formik.touched.rePassword ? (
                <div className="alert alert-danger">
                  {formik.errors.rePassword}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="form-control"
                id="phone"
                placeholder="Phone"
              ></input>
              <label htmlFor="phone">Phone</label>
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger">{formik.errors.phone}</div>
              ) : (
                ""
              )}
            </div>
            {message ? (
              <div className="alert  alert-warning">{message}</div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="btn mainColorBg text-white"
              disabled={!formik.isValid || !formik.dirty}
            >
              {btnLoad ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2" role="status">
                    Registering
                  </span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
