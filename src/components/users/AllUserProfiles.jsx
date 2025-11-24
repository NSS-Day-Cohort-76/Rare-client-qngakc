import { useEffect, useState } from "react";
import {
  getAllUsers,
  toggleActiveStatus,
  toggleAdminStatus,
} from "../../services/userService";
import "./AllUserProfiles.css";
import { Link } from "react-router-dom";

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
  const handleToggleAdmin = (e) => {
    const userId = parseInt(e.target.getAttribute("data-userid"));
    const newStatus = parseInt(e.target.value);

    if (window.confirm(`Confirm status change of user?`)) {
      toggleAdminStatus(userId, newStatus).then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, is_admin: newStatus } : user
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
                />
                Active
              </div>

              <div className="checks-column">
                <div className="user-checks">
                  <input
                    type="radio"
                    name={`adminStatus-${user.id}`}
                    value={0}
                    data-userid={user.id}
                    checked={user.is_admin === 0}
                    onChange={handleToggleAdmin}
                  />
                  Author
                </div>{" "}
                <div className="user-checks">
                  <input
                    type="radio"
                    name={`adminStatus-${user.id}`}
                    value={1}
                    data-userid={user.id}
                    checked={user.is_admin === 1}
                    onChange={handleToggleAdmin}
                  />
                  Admin
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
