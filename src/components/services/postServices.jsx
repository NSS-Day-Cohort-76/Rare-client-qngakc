export const getAllPost = (post) => {
    return fetch("http://localhost:8088/post").then(res => res.json())
}

export const createPost = (postData) => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  }).then((res) => res.json());
};