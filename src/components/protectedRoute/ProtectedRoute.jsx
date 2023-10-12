import React, { Children, useContext } from "react";
import { authContext } from "../context/authentication";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function ProtectedRoute({ children }) {
  // const { token } = useContext(authContext);
  const token = localStorage.getItem("Token");
  if (!token) {
    return (
      <>
        {toast("Login To Access This Page",{icon:'😔'})}
        <Navigate to={"/login"} />;
      </>
    );
  }

  return <>{children}</>;
}
