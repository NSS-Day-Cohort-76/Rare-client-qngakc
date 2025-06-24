export const displayComments = (postId) => {
  return fetch(`http://localhost:8088/comments/${postId}`).then((res) =>
    res.json()
  );
};

export const postComment = (comment) => {
  return fetch(`http://localhost:8088/post_comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json());
};


export const updateComment = (comment, id) => {
  return fetch(`http://localhost:8088/update_comment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json());
};

export const deleteComment = (id) => {
  return fetch(`http://localhost:8088/deleteComment/${id}`, {
    method: "DELETE"
  }
  ).then(res => res.json())
}
