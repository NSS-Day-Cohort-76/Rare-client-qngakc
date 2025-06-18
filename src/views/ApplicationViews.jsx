import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AllPosts } from "../components/posts/AllPosts";
import { PostDetails } from "../components/posts/PostDetails";
import { MyPost } from "../components/MyPost/mypost.jsx";
import { AllTags } from "../components/tags/AllTags"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/posts" element={<AllPosts setToken={setToken} />} />
          <Route
            path="/posts/:postId"
            element={<PostDetails setToken={setToken} />}
          />
          <Route path="/myposts" element={<MyPost token={token} />} />
      <Route path="/tags" element={<AllTags setToken={setToken} />}  />
        
        
      </Route>
    </Routes>
  </>
}
