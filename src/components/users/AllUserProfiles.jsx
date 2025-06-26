import { useEffect, useState } from "react";
import {
  deactivateUser,
  getAllUsers,
  toggleActiveStatus,
} from "../../services/userService";
import "./AllUserProfiles.css";
import { Link, Outlet } from "react-router-dom";

export const AllUserProfiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleToggleActive = (e) => {
    const userId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (
      window.confirm(
        `Confirm ${isChecked ? "activation" : "deactivation"} of user?`
      )
    ) {
      toggleActiveStatus(userId, isChecked ? 1 : 0).then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, active: isChecked ? 1 : 0 } : user
          )
        );
      });
    }
  };

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
                <input
                  type="checkbox"
                  value={user.id}
                  checked={user.active === 1}
                  onChange={handleToggleActive}
                  style={{
                    opacity: 1,
                    cursor: "pointer",
                  }}
                />{" "}
                Active
              </div>

              <div className="column" id="user-checks">
                <div>
                  {user.is_admin === 0 ? (
                    <>
                      <input type="radio" checked readOnly /> Author
                    </>
                  ) : (
                    <>
                      <input type="radio" readOnly name="admin" /> Author
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
