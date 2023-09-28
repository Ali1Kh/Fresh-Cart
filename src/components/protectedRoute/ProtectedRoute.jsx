import React, { Children, useContext } from "react";
import { authContext } from "../context/authentication";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children}) {
  // const { token } = useContext(authContext);
  const token = localStorage.getItem("Token");
  if (!token) {
    return (
      <>
        <h1>Login To access This Page.</h1>
        <Navigate to={"/login"} />;
      </>
    );
  }

  return <>{children}</>;
}
