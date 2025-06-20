import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import "./AllUserProfiles.css";
import { Link } from "react-router-dom";
export const AllUserProfiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);
  return (
    <>
      <h2 className="title is-2" id="user-title">
        Users
      </h2>
      <div id="users-table">
        {users?.map((user) => {
          return (
            <div className="row" key={user.id}>
              <div className="column">
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </div>
              <div className="column">
                {user.first_name} {user.last_name}
              </div>
              <div className="column">
                <input type="checkbox" /> Active
              </div>
              <div className="column" id="user-checks">
                <div>
                  <input type="radio" /> Author
                </div>
                <div>
                  {" "}
                  <input type="radio" /> Admin
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
