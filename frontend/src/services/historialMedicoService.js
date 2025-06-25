import axios from "axios"

const api = "http://localhost:3000"

export const getHistorialMedico = async () => {
    const res = await axios.get(api)
    return res.data
}

export const createHistorialMedico = async (data) => {
    const res = await axios.post(api, data)
    return res.data + res.status
}