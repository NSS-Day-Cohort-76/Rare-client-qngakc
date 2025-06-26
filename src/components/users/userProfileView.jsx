import { useEffect, useState } from "react";
import {
  createSubscribe,
  deleteSubscribe,
  getOneUser,
  getSubscribedList,
} from "../../services/userService.jsx";
import { useParams } from "react-router-dom";

export const UserProfileView = ({ token }) => {
  const [users, setUsers] = useState([]);
  // const [subscribed, setSubscribed] = useState(false);
  const [subscribedList, setSubscribedList] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getOneUser(userId).then(setUsers);
  }, [userId]);

  useEffect(() => {
    getSubscribedList().then(setSubscribedList);
  }, []);

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

  return (
    <>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={users.profile_image_url} alt="Placeholder" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">
                {users.first_name} {users.last_name}
              </p>
            </div>
          </div>

          <div className="content">
            {users.bio}
            <br />
            <time>{users.created_on}</time>
          </div>

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
    </>
  );
};
