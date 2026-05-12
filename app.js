import express from "express"
import RegistroEstudiantesRoutes from "./src/Routes/RegistroEstudiantes.js"
import LoginEstudiantesRoutes from "./src/Routes/LoginEstudiantes.js"
import RegistroMaestrosRoutes from "./src/Routes/RegistroMaestro.js"
import cookieParser from "cookie-parser"


const app = express();


app.use(cookieParser())

//PARA QUE LA API ADMIMITA EL FORMATO JSON
app.use(express.json())


app.use("api/registerEstudiante", RegistroEstudiantesRoutes)
app.use("api/registerMaestro", RegistroMaestrosRoutes)
app.use("api/login", LoginEstudiantesRoutes)


export default app;