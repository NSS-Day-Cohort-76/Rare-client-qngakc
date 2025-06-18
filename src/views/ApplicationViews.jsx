import { Route, Routes, Navigate } from "react-router-dom";
import { Authorized } from "./Authorized.jsx";
import { Login } from "../components/auth/Login.js";
import { Register } from "../components/auth/Register.js";
import { AllPosts } from "../components/posts/AllPosts.jsx";
import { CreatePost } from "../components/posts/CreatePost.jsx";

export const ApplicationViews = ({ token, setToken, currentUser }) => {
  console.log("ApplicationViews rendering with token:", token);

  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />

      {/* Wrap all protected routes in Authorized layout */}
      <Route element={<Authorized token={token} />}>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<AllPosts setToken={setToken} />} />
        <Route path="/new-post" element={<CreatePost currentUser={currentUser} />} />
      </Route>

      {/* Catch-all 404 route */}
      <Route path="*" element={<h1>404 Not Found - No route matched</h1>} />
    </Routes>
  );
};
