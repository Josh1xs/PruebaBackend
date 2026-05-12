import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { config } from "../../config.js"
import  profesorModel from "../Models/profesores.js"

const recoveryPasswordControllerProfesores = {}

recoveryPasswordControllerProfesores.requestCode = async (req,res) => {
    try {
        const {email} = req.body

        const profesorFound = await profesorModel.findOne({email})

        if(!profesorFound){
            return res.status(400).json({message: "No se encuentra"})
        }

        //Codigo random
        const randomCode = crypto.randomBytes(3).toString("hex")

        //Guardamos el token
        const token = jsonwebtoken.sign(

            {email,randomCode,userType: "maestro", verified: "false"},

            config.JWT.secret,

            {expiresIn: "10m"}
        )
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.USER_email,
                pass: config.email.USER_password    
            }
        })

    
        const mailOption = {
            from:config.email.USER_email,
            to: email,
            subject: "RECUPERACION DE TU CONTRASEÑA",
            "text": "Tu codigo es: " + randomCode + "Vence en 10 minutos"
        };

        transporter.sendMail(mailOption), (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error al enviar tu correo"})
            }
            return res.status(200).json({message: "Correo enviado "})
        }


        res.cookie("recoveryCookie", token, {maxAge: 10 *60 *1000})

        return res.status(200).json({message: "El codigo fue enviado"})

        

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


recoveryPasswordControllerProfesores.verifyCode = async (req, res) => {
    try {
        const {code} = req.body

        //Accedemos a nuestra cookie
        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token,config.JWT.secret)


        if(code!== decoded.randomCode) {
            return res.status(400).json({message: "Codigo invalido"})
        }

        const newToken = jsonwebtoken.sign(
        
        {email: decoded.email, userType: "estudiante", verified: true},

        config.JWT.secret,

        {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000})

        return res.status(200).json({message: "Codigo correcto"})


    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


recoveryPasswordControllerProfesores.newPassword = async (req, res) => {
    try {
        const {newPassword, configNewPassword} = req.body


        if(newPassword !== configNewPassword) {
            return res.status(400).json({message: "Las contraseñas no coinciden"})
        }

        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token,config.JWT.secret)


        if(!decoded.verified){
            return res.status(400).json({message: "Codigo no verificado"})
        }


        const passwordHashed = await bcrypt.hash(newPassword,10)

        await profesorModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHashed},
            {new: true}
        )

        res.clearCookie("recoveryCookie")
        return res.status(200).json({message: "Contraseña actualizada"})


    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default recoveryPasswordControllerProfesores;