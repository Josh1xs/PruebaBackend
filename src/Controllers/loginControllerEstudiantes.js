import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { config } from "../../config.js"
import estudiantesModel from "../Models/estudiantes.js"
import { json } from "express"

const loginEstudiantesController = {}


loginEstudiantesController.login = async(req,res) => {
    try {
        const{email, password} = req.body


        //Verificamos que el correo exista 
        const estudianteFound = await estudiantesModel.findOne({email})

        //Si no existe el correo 
        if(!estudianteFound){
            return res.status(400).json({message: "El estudiante no existe"})
        }

        if(estudianteFound.timeOut && estudianteFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"})
        }


        const isMatch = await bcryptjs.compare(password, estudianteFound.password)


        if(!isMatch){
            estudianteFound.loginAttemps = (estudianteFound.loginAttemps || 0) + 1

                    return res.status(401).json({message: "Contraseña incorrecta "})
        }

        if(estudianteFound.loginAttemps >= 7) {
            estudianteFound.timeOut = Date.now() + 7 * 60 *1000
            estudianteFound.loginAttemps = 0
            await estudianteFound.save()

            return res.status(400).json({message: "Cuenta bloqueada por varios intentos fallidos"})

        }

        await estudianteFound.save()


        //Reseteamos los intentos si es correcto 

        estudianteFound.loginAttemps = 0
        estudianteFound.timeOut = null

        //Generamos nuestro token
        const token = jsonwebtoken.sign (
            {id: estudianteFound._id, userType: "estudiante"},

            config.JWT.secret,
            {expiresIn: "30d"}

        )

        res.cookie("authCookie", token)

        return res.status(200).json({message: "Bienvenido"})

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default loginEstudiantesController;