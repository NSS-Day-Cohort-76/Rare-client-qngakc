export const getAllPosts = () => {
      return fetch("http://localhost:8088/posts").then((res) =>
   res.json()
  );
}

export const getMyPosts = (token) => {
  return fetch (`http://localhost:8088/myposts/${token}`).then((res) => res.json())
}