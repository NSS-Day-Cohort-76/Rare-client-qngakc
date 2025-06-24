export const getAllReactions = () => {
    return fetch(`http://localhost:8088/reactions`).then((res) => res.json())
}