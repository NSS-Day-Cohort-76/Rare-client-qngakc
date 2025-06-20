import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AllPosts } from "../components/posts/AllPosts";
import { PostDetails } from "../components/posts/PostDetails";
import { MyPost } from "../components/MyPost/mypost.jsx";
import { Comment } from "../components/comment/comment.jsx";
import { AllTags } from "../components/tags/AllTags";
import { PostForm } from "../components/posts/PostForm.jsx";
import { EditPost } from "../components/posts/EditPost.jsx";


export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/posts" element={<AllPosts token={token} />} />
          <Route path="/posts/:postId/edit" element={<EditPost token={token} />} />
          <Route path="/new-post" element={<PostForm token={token} />} />
          <Route
            path="/posts/:postId"
            element={<PostDetails setToken={setToken} />}
          >
            <Route path="comments" element={<Comment token={token}/>} />
          </Route>
          <Route path="/myposts" element={<MyPost token={token} />} />
          <Route path="/tags" element={<AllTags setToken={setToken} />} />
        </Route>
      </Routes>
    </>
  );
};
