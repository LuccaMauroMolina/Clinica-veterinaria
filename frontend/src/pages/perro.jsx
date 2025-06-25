import { useEffect, useState } from "react";
import {obtenerTodos} from "../services/perroService"
/*
filtrarPorLetra
crearPerro
actualizarPerro
eliminarPerro
*/
export default function Perros(){
    const [perro, setPerros] = useState([]);
    /*const [filtrarLaLetra, setfiltrarLaLetra] = useState("");
    const [update, setUpdatePerro] = useState({ nombre: "", edad: "", raza: "", dueño: "" });
    const [deleteP, setDeletePerro] = useState({nombre: ""});
    const [nuevoPerro, setNuevoPerro] = useState({ nombre: "", edad: "", raza: "", dueño: "" });
*/
    useEffect(() => {
        const fetchPerros = async () => {
        const lista = await obtenerTodos();
        setPerros(lista);
    };
        fetchPerros();
    }, []);

    /*const handleChange = (e) => {
        setNuevoPerro({ ...nuevoPerro, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        setUpdatePerro({ ...update, [e.target.name]: e.target.value });
    };

    const handleDelete = (e) => {
        setDeletePerro({ ...deleteP, [e.target.name]: e.target.value });
    };

    const handleFilter = (e) => {
        setfiltrarLaLetra(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await crearPerro(nuevoPerro)
        const listaActualizada = await obtenerTodos()
        setPerros(listaActualizada)
        setNuevoPerro({nombre: "",edad: "", raza: "", dueño: ""})
    }*/

    return(
        <>
        <div>
            <h1>Tu lista de Perros</h1>
            <section>
                    {perro.map((p) => (
                        <div key={p.id || p.nombre}>
                            <p>🐾 Nombre: {p.nombre}</p>
                            <p>🎂 Edad: {p.edad}</p>
                            <p>🐶 Raza: {p.raza}</p>
                            <p>👤 Dueño: {p.dueño}</p>
                            <hr />
                        </div>
))}
            </section>
        </div>
        </>
    )

}