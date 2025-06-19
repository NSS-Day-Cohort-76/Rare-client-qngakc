import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AllPosts } from "../components/posts/AllPosts";
import { PostDetails } from "../components/posts/PostDetails";
import { MyPost } from "../components/MyPost/mypost.jsx";
import { AllTags } from "../components/tags/AllTags";
import { NewPost } from "../components/posts/CreatePost.jsx";


export const ApplicationViews = ({ token, setToken }) => {
const location = useLocation()
console.log("Current path name:", location.pathname)
  return (
    <>
    <h1>Test</h1>
      <Routes>
        <Route path="*" element={<div>Fallback route working</div>} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/posts" element={<AllPosts setToken={setToken} />} />
          <Route path="/new-post" element={<NewPost token={token} />} />
          <Route
            path="/posts/:postId"
            element={<PostDetails setToken={setToken} />}
          />
          <Route path="/myposts" element={<MyPost token={token} />} />
          <Route path="/tags" element={<AllTags setToken={setToken} />} />
        </Route>
        <Route path="*" element={<div>Fallback route working</div>} />
      </Routes>
    </>
  );
};
