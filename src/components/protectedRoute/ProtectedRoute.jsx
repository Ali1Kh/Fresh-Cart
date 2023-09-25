import React, { useContext } from "react";
import { authContext } from "../context/authentication";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute() {
  const { token } = useContext(authContext);
  console.log(token);
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <h1>Login To access This Page.</h1>;
}
