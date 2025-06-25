import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { AllPosts } from "../components/posts/AllPosts";
import { PostDetails } from "../components/posts/PostDetails";
import { MyPost } from "../components/MyPost/mypost.jsx";
import { AllTags } from "../components/tags/AllTags";
import { AllCategories } from "../components/categories/AllCategories.jsx";
import { Comment } from "../components/comment/comment.jsx";
import { PostForm } from "../components/posts/PostForm.jsx";
// import { EditComment } from "../components/comment/EditComment.jsx";
import { EditPost } from "../components/posts/EditPost.jsx";
import { AllUserProfiles } from "../components/users/AllUserProfiles.jsx";
import { UserProfileView } from "../components/users/userProfileView.jsx";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          <Route path="/posts" element={<AllPosts token={token} />} />
          <Route
            path="/posts/:postId/edit"
            element={<EditPost token={token} />}
          />
          <Route path="/new-post" element={<PostForm token={token} />} />
          <Route
            path="/posts/:postId"
            element={<PostDetails setToken={setToken} />}
          >
            <Route path="comments" element={<Comment token={token} />} />
          </Route>
          <Route path="/myposts" element={<MyPost token={token} />} />
          <Route path="/tags" element={<AllTags setToken={setToken} />} />
          {/* <Route path="/edit_comment/:commentId" element={<EditComment/>}/> */}
          <Route
            path="/categories"
            element={<AllCategories setToken={setToken} />}
          />
          <Route
            path="/users"
            element={<AllUserProfiles setToken={setToken} />}/>
            <Route path="users/:userId" element={<UserProfileView token={token} />} />
          </Route>
      </Routes>
    </>
  );
};
