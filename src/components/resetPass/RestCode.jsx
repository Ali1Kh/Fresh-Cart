import axios from "axios";
import React, { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function RestCode() {
  const [code, setCode] = useState("");
  const navigateUpdatePass = useNavigate();

  const handleChange = (newValue) => {
    setCode(newValue);
  };
  async function resetCode() {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode: code,
        }
      );
      if (data.status == "Success") {
        navigateUpdatePass("/updatePassword");
        toast.success(data.status);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  function validateChar(value) {
    if (!value.match(/^\d$/)) {
      toast.remove();
      toast.error("Please Enter Vaild Reset Code");
    }
    return value.match(/^\d$/);
  }

  return (
    <>
      <title>Forget Password</title>
      <main className="d-flex justify-content-center px-2 py-5">
        <div className="container py-1">
          <div className="inner mt-4">
            <h5 className="mb-3">Reset Password</h5>
            <div className="inputs mb-3">
              <MuiOtpInput
                TextFieldsProps={{ size: "small" }}
                value={code}
                onChange={handleChange}
                length={6}
                maxWidth={"450px"}
                validateChar={validateChar}
              />
            </div>
            <button
              disabled={code.length == 6 ? false : true}
              onClick={resetCode}
              className="btn btn-success"
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
