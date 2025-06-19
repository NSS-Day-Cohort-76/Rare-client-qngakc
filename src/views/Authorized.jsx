import { Navigate, Outlet } from "react-router-dom";

export const Authorized = ({ token }) => {
  console.log("Token in authorized:", token, typeof token)
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
