import { Navigate, Outlet } from "react-router-dom";

export const Authorized = ({ token }) => {
  console.log("Authorized token check:", token)
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
