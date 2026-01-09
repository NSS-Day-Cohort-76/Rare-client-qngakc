export const getAllUsers = () => {
  return fetch(`http://localhost:8088/users`).then((res) => res.json());
};

export const getOneUser = (id) => {
  return fetch(`http://localhost:8088/users/${id}`).then((res) => res.json());
};

export const createSubscribe = (token, userId) => {
    return fetch(`http://localhost:8088/subscription/${token}`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(userId)
    })
}

export const getSubscribedList = () => {
    return fetch(`http://localhost:8088/subscription`).then(res => res.json())
}

export const deleteSubscribe = (id) => {
    return fetch(`http://localhost:8088/subscription/${id}`, {
        method: "DELETE"
    })
}
//   return fetch(`http://localhost:8088/subscription/${token}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userId),
//   });
// };

export const getSingleUser = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) =>
    res.json()
  );
};

export const toggleActiveStatus = (userId, status) => {
  return fetch(`http://localhost:8088/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ active: status }),
  });
};

export const toggleAdminStatus = (userId, status) => {
  return fetch(`http://localhost:8088/users_admin/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_admin: status }),
  });
};
