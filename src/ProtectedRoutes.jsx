import React from "react";

import useAuth from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { currentUser } = useAuth();

  

  return currentUser ? (
    children
  ) : (
    <h1 className="ypt-20 yw-full yh-full ytext-center">
      you are not authorized, login/register first.
    </h1>
  );
};

export default ProtectedRoutes;
