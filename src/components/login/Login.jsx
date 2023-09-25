import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../context/authentication";
export default function Login() {
  let userLogin = {
    email: "",
    password: "",
  };
  const [message, setMessage] = useState(null);
  const [btnLoad, setBtnLoading] = useState(false);
  const navigateLogin = useNavigate();
  let { setToken } = useContext(authContext);
  async function signIn(values) {
    setBtnLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        setMessage("Success");
        localStorage.setItem("Token", data.token);
        setToken(data.token);
        setTimeout(() => {
          navigateLogin("/products");
        }, 200);
      } else setMessage("Error");
    } catch (error) {
      setMessage(error.response.data.message);
      formik.resetForm();
    }
    setBtnLoading(false);
  }
  const formik = useFormik({
    initialValues: userLogin,
    onSubmit: signIn,
    validate(values) {
      setMessage(null);
      let errors = {};
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
      return errors;
    },
  });
  return (
    <>
      <section className="login p-5 mb-5">
        <div className="container">
          <h2 className="mb-4">Login :</h2>
          <form onSubmit={formik.handleSubmit}>
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
              <label htmlFor="email">Email</label>
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
                    Login
                  </span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
