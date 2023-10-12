import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import $ from "jquery";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
export default function UpdatePass() {
  const updateNavigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let updatePassValues = {
    email: "",
    newPassword: "",
  };
  const formik = useFormik({
    initialValues: updatePassValues,
    onSubmit: updatePass,
    validate(values) {
      let errors = {};
      if (
        !values.email.match(
          /^[a-zA-Z]{1,}[a-zA-Z0-9]{2,15}@[a-z]{3,15}\.[a-z]{3,9}$/
        )
      ) {
        errors.email = "Email Is Invaild";
      }
      if (!values.newPassword.match(/^[A-Za-z][\w|$#!]{7,24}$/)) {
        errors.password = "Password Must Be More Than 8 Charchters";
      }
      return errors;
    },
  });

  async function updatePass(values) {
    try {
      let { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values);
      if (data.token) {
        toast.success("Password Changed");
        updateNavigate("/login")
      }

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  return (
    <>
      <title>Change Password</title>
      <main className="d-flex justify-content-center px-2 py-5">
        <div className="container px-md-5 py-1">
          <div className="inner mt-4">
            <h5 className="mb-3">Update Password</h5>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="emailInput form-control"
                  id="email"
                  placeholder="name@example.com"
                />
                <label htmlFor="email">Email address</label>
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger mt-1">
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-floating mb-3">
                <FormControl variant="outlined" className="w-100">
                  <InputLabel htmlFor="newPassword">Password</InputLabel>
                  <OutlinedInput
                    id="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {formik.errors.password && formik.touched.newPassword ? (
                  <div className="alert alert-danger mt-1">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className="btn btn-success"
              >
                Change
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
