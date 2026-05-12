import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { config } from "../../config.js"
import maestrosModel from "../Models/profesores.js"
import { json } from "express"

const loginMaestrosController = {}


loginMaestrosController.login = async(req,res) => {
    try {
        const{email, password} = req.body


        //Verificamos que el correo exista 
        const  maestroFound = await maestrosModel.findOne({email})

        //Si no existe el correo 
        if(!maestroFound){
            return res.status(400).json({message: "El estudiante no existe"})
        }

        if(maestroFound.timeOut && maestroFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"})
        }


        const isMatch = await bcryptjs.compare(password, maestroFound.password)


        if(!isMatch){
            maestroFound.loginAttemps = (maestroFound.loginAttemps || 0) + 1

                    return res.status(401).json({message: "Contraseña incorrecta "})
        }

        if(maestroFound.loginAttemps >= 7) {
            maestroFound.timeOut = Date.now() + 7 * 60 *1000
            maestroFound.loginAttemps = 0
            await maestroFound.save()

            return res.status(400).json({message: "Cuenta bloqueada por varios intentos fallidos"})

        }

        await maestroFound.save()


        //Reseteamos los intentos si es correcto 

        maestroFound.loginAttemps = 0
        maestroFound.timeOut = null

        //Generamos nuestro token
        const token = jsonwebtoken.sign (
            {id: maestroFound._id, userType: "maestro"},

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

export default loginMaestrosController;