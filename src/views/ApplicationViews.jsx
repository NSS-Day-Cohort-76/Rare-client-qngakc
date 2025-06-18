import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllPosts } from "../components/posts/AllPosts"
import { MyPost } from "../components/MyPost/mypost.jsx"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path="/posts" element={<AllPosts setToken={setToken} />}/>
      <Route path="/myposts" element={<MyPost token={token}/>}/>

      </Route>
    </Routes>
  </>
}
