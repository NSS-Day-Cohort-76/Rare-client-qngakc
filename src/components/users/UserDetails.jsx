import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSubscribe, deleteSubscribe, getOneUser, getSubscribedList } from "../../services/userService";
import { getSingleUser } from "../../services/userService";
import "./UserDetails.css";

export const UserDetails = ({ token }) => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  // const [subscribed, setSubscribed] = useState(false);
  const [subscribedList, setSubscribedList] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getSingleUser(userId).then(setUser);
  }, []);

  useEffect(() => {
    getOneUser(userId).then(setUsers);
  }, [userId]);

  useEffect(() => {
    getSubscribedList().then(setSubscribedList);
  }, []);

  const handleAdminCHange = () => {};

  const handleSubscribe = () => {
    const sub = {
      follower_id: token,
      author_id: userId,
      created_on: new Date(),
    };
    createSubscribe(userId, sub).then(() => {
      getSubscribedList().then(setSubscribedList);
    });
  };

  const handleDeleteSubscribe = () => {
    const sub = subscribedList.find(
      (list) =>
        parseInt(token) === list.follower_id &&
        parseInt(userId) === list.author_id
    );

    deleteSubscribe(sub.id).then(() => {
      getSubscribedList().then(setSubscribedList);
    });
  };

  const findOneListItem = subscribedList.some(
    (sub) =>
      parseInt(token) === sub.follower_id && parseInt(userId) === sub.author_id
  );

  if (!user.id) return null;
  return (
    <section id="user-details-container">
      <div className="user-row">
        <div className="user-column">
          {user?.profile_image_url ? (
            <img
              src={user.profile_image_url}
              alt={user.first_name}
              id="user-img"
            />
          ) : (
            <img
              id="default-img"
              src={
                "https://em-content.zobj.net/source/apple/419/man-facepalming-light-skin-tone_1f926-1f3fb-200d-2642-fe0f.png"
              }
              alt={"Default User Img"}
            />
          )}
          {user.first_name} {user.last_name}
        </div>
        <div className="user-column">
          <div id="first-row" className={`${"user-row"} ${"title is-4"}`}>
            Username: {user.username}
          </div>
          <div className={`${"user-row"} ${"title is-4"}`}>
            Email: {user.email}{" "}
          </div>
          <div className={`${"user-row"} ${"title is-4"}`}>
            Created On: {user.created_on.slice(0, 10)}
          </div>
          <div className={`${"user-row"} ${"title is-4"}`}>
            Profile Type: {user.is_admin === 1 ? "Admin" : "Author"}
          </div>
          <div>
            {token === userId ? null : (
              <button
                onClick={() => {
                  findOneListItem ? handleDeleteSubscribe() : handleSubscribe();
                }}
              >
                {findOneListItem ? "Unsubscribe" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
