export const getAllPosts = () => {
      return fetch("http://localhost:8088/posts").then((res) =>
    res.json()
  );
}

export const getPostById = (postId) => {
        return fetch(`http://localhost:8088/posts/${postId}`).then((res) =>
    res.json()
  );
}