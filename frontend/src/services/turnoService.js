import axios from "axios"

const api = "http://localhost:3000"

export const getTurnos = async () => {
    const res = await axios.get(api)
    return res.data
}


export const createTurno = async (data) => {
    const res = await axios.get(api, data)
    return res.data + res.status
}

export const updateTurno = async (update) => {
    const res = await axios.get(api, update)
    return res.data
}

export const deleteTurno = async (del) => {
    const res = await axios.get(api, del)
    return res.data + res.status
}