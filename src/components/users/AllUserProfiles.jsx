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
                {user.active === 1 ? (
                  <>
                    <input type="checkbox" checked readOnly /> Active
                  </>
                ) : (
                  <>
                    <input type="checkbox" readOnly /> Active
                  </>
                )}
              </div>

              <div className="column" id="user-checks">
                <div>
                  {user.is_admin === 0 ? (
                    <>
                      <input type="radio" checked readOnly /> Author
                    </>
                  ) : (
                    <>
                      <input type="radio" readOnly /> Author
                    </>
                  )}
                </div>
                <div>
                  {user.is_admin === 1 ? (
                    <>
                      <input type="radio" checked readOnly /> Admin
                    </>
                  ) : (
                    <>
                      <input type="radio" readOnly /> Admin
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
