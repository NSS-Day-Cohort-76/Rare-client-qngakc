import { useEffect, useState } from "react";
import { createSubscribe, getOneUser } from "../../services/userService.jsx";
import { useParams } from "react-router-dom";

export const UserProfileView = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [subscribed, setSubscribed] = useState(false)
  const { userId } = useParams();

  useEffect(() => {
    getOneUser(userId).then(setUsers);
  }, [userId]);

  const handleSubscribe = () => {
    const sub = {
      follower_id: token,
      author_id: userId,
      created_on: new Date(),
    };
    createSubscribe(userId, sub).then();
  };

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
                {users.first_name}
                {users.last_name}
              </p>
            </div>
          </div>

          <div className="content">
            {users.bio}
            <br />
            <time>{users.created_on}</time>
          </div>
          {token === userId ? (
            ""
          ) : (
            <button onClick={() => {handleSubscribe(); setSubscribed(!subscribed) }}>{subscribed ? "Unsubscribe" : "Subscribe"}</button>
          )}
        </div>
      </div>
      ;
    </>
  );
};
