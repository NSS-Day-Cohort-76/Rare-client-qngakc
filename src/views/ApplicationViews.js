import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllPosts } from "../components/posts/AllPosts"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route path="/posts" element={<AllPosts setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        
        
      </Route>
    </Routes>
  </>
}
