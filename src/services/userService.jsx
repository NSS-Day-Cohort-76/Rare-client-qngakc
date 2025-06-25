export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`).then((res) => res.json())
}

export const getOneUser = (id) => {
    return fetch(`http://localhost:8088/users/${id}`).then((res) => res.json())
}