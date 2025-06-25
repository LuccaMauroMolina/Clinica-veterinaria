const express = require("express");
const app = express();
const cors = require("cors")
const port = 3000
const {sequelize, Usuario, Perro, Turno, HistorialMedico} = require("./models")
const routePerro = require("./routes/routePerro")
const routeTurno = require("./routes/routeTurnos")
const routeUsuario = require("./routes/routeUsuario")
const routeHistorialMedico = require("./routes/routeHistorialMedico")

const logger = require("./logs/logServices");

logger.error("Esto es un error");
logger.info("Esto es un info");

app.use(cors())
app.use(express.json());
app.use('/api/perros',routePerro)
app.use("/api/turnos", routeTurno)
app.use("/api/usuario", routeUsuario)
app.use("/api/historialmedico", routeHistorialMedico)
app.use(require("./middlewares/errorHandler"));

sequelize.authenticate()
    .then(() => console.log("Conexion exitosa a la base de datos"))
    .catch((err) => console.error("Error al conectar DB:", err))

async function startServer(){
    try{
        await sequelize.sync({force: true})
        console.log("Base de datos sincronizada")

        const usuario = await Usuario.create({
            email: "mauro79@gmail.com",
            contraseña: "1234",
            rol: "veterinario"
        })
        const perro = await Perro.create({
            nombre: "Max",
            raza: "Bull terrier",
            edad: 5,
            dueño: "Juan Perez"
        })
        await Turno.create({
            fecha: "2025-06-12",
            hora: "15:30:00",
            estado: true,
            //perroId: perro.id
        })
        await HistorialMedico.create({
        tipo: "Vacuna",
        descripcion: "Vacuna antirrábica",
        fecha: "2025-06-01",
        //perroId: perro.id
    });

    console.log("✅ Datos de prueba insertados");

    app.listen(port, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    })
    }catch(error){
        console.error("Error al iniciar",error)
    }
}

startServer();

/*app.listen(port, () => {
    console.log("Puerto activado",port)
})*/