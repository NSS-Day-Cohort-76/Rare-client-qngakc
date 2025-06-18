export const displayComment = () => {
  return fetch("http://localhost:3000/post/comments").then(res => res.json())
}