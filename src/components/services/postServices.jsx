export const getAllPost = (post) => {
    return fetch("http://localhost:8088/post").then(res => res.json())
}