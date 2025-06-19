export const getAllPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getPostById = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((res) =>
    res.json()
  );
};

export const getMyPosts = (token) => {
  return fetch(`http://localhost:8088/myposts/${token}`).then((res) =>
    res.json()
  );
};

export const createPost = (postData) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.text().then(text => {
      return text ? JSON.parse(text) : {};
    });
  });
};