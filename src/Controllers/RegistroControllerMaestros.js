import nodemailer from "nodemailer" 
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { config } from "../../config.js"
import profesorModel from "../Models/profesores.js"


const registerMaestroController = {}


registerMaestroController.register = async (req, res ) => {
    try {
        //Solicitamos nuestros datos

        const {name,lastname,email,password,phone,speciality,isActive,isVerified,timeOut} = req.body

        //Validamos si ya el correo existe

        const existMaestro = await profesorModel.findOne({email})


        if (existMaestro) {
            return res.status(400).json({message: "El estudiante ya existe"})
        }
        //Encriptamos la contraseña

        const passwordHashed = await bcryptjs.hash(password,10)

  
        const randomCode  = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(

            {randomCode, name, lastname, email, phone, speciality, isActive, password: passwordHashed,  isVerified, timeOut},


            //Nuestra llave secreta 
            config.JWT.secret,
            {expiresIn: "17m"}

        )
      

        res.cookie("registrationCookie", token, {maxAge: 17 * 60 * 1000})

        //Enviamos nuestro correo

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.USER_email,
                pass: config.email.USER_password
            }
        })

        const mailOptions = {
            from: config.email.USER_email,
            to: email,
            subjetc: "Verificacion de cuenta",
            text: "Para verificar tu cuenta, usa este codigo" + randomCode + "expira en 17 minutos"
        }

        transporter.sendMail(mailOptions,(error, info) =>{
            if (error){
                console.log("error" + error)
                return res.status(500).json({message: "Error al enviar el correo"})
            }
            return res.status(200).json({message: "Correo enviado revisa tu bandeja"})
        })

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


registerMaestroController.verifyCode = async (req,res) => {
    try {
        const {verificationCodeRequest} = req.body
        const token = req.cookies.registrationCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const {
            randomCode : storedCode,
            name,
            lastname,
            email,
            password,
            phone,
            speciality,
            isVerified, 
            isActive,
            loginAttemps,
            timeOut
        } = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid Code"})
        }

        const newMaestro = profesorModel({
            name,
            lastname,
            email,
            password,
            phone,
            speciality,
            isVerified: true
        })

        await newMaestro.save()

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Profesor registrado"})

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


export default registerMaestroController;