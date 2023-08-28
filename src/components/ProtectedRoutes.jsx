import React from "react";
import { useStateValue } from "../states/StateProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const [{ isLoggedIn }] = useStateValue();
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoutes;
