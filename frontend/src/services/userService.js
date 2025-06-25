import axios from "axios"

const api = "http://localhost:3000"

export const getUsuario = async () => {
    const res = await axios.get(api)
    return res.data
}

export const filtrarLetraUsuario = async (letra) => {
    const res = await axios.get(api, letra)
    return res.data
}

export const createUsuario = async (create) => {
    const res = await axios.get(api, create)
    return res.data + res.status
}

export const loginUsuario = async (login) => {
    const res = await axios.get(api, login)
    return res.data + res.status
}

export const updateUsuario = async (update) => {
    const res = await axios.get(api, update)
    return res.data
}

export const deleteUsuario = async (del) => {
    const res = await axios.delete(api, del)
    return res.data + res.status
}