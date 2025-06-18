import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {
  return (
    <nav className="navbar">
      <Link to="/posts">Home</Link>
      <Link to="/new-post" className="add-post-btn">
        New Post +
      </Link>
    </nav>
  );
};
