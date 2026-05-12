import express from "express"
import RegistroEstudiantesRoutes from "./src/Routes/RegistroEstudiantes.js"
import LoginEstudiantesRoutes from "./src/Routes/LoginEstudiantes.js"
import RegistroMaestrosRoutes from "./src/Routes/RegistroMaestro.js"
import LoginMaestroRoutes from "./src/Routes/LoginMaestros.js"
import recuperarContraseñaEstudiantes from "./src/Routes/recuperarContraseñaEstudiantes.js"
import recuperarContraseñaMaestros from "./src/Routes/recuperarContraseñaMaestros.js"
import Materias from "./src/Routes/materias.js"
import Tareas from "./src/Routes/tareas.js"
import Logout from "./src/Routes/logout.js"

import cookieParser from "cookie-parser"


const app = express();


app.use(cookieParser())

//PARA QUE LA API ADMIMITA EL FORMATO JSON
app.use(express.json())



//Normales
app.use("/api/materias", Materias)
app.use("/api/tareas", Tareas )


//Autenticacion
app.use("/api/registerEstudiante", RegistroEstudiantesRoutes)
app.use("/api/registerMaestro", RegistroMaestrosRoutes)
app.use("/api/loginEstudiante", LoginEstudiantesRoutes)
app.use("/api/loginMaestro", LoginMaestroRoutes)  
app.use("/api/recoveryPassword", recuperarContraseñaEstudiantes)
app.use("/api/recoveryPasswordProfesores", recuperarContraseñaMaestros)
app.use("/api/logout", Logout)

export default app;