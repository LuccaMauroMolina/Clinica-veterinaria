import axios from "axios";

// Base URL correcta (ojo: `/api/perros` plural!)
const api = "http://localhost:3000/api/perros";

// ✅ Obtener todos los perros
export const obtenerTodos = async () => {
  const res = await axios.get(api);
  return res.data;
};

// ✅ Filtrar por letra: se envía como query param
export const filtrarPorLetra = async (letra) => {
  const res = await axios.get(`${api}/filtrar`, {
    params: { letra }
  });
  return res.data;
};

// ✅ Crear un perro nuevo
export const crearPerro = async (data) => {
  const res = await axios.post(api, data);
  return res.data;
};

// ✅ Actualizar perro por ID
export const actualizarPerro = async (id, data) => {
  const res = await axios.put(`${api}/:nombre`, id, data);
  return res.data;
};

// ✅ Eliminar perro por ID
export const eliminarPerro = async (id) => {
  const res = await axios.delete(`${api}/:nombre`, id);
  return res.data;
};
