import nodemailer from "nodemailer" 
import crypto from "crypto"
import jsobwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { config } from "../../config.js"
import estudianteModel from "../Models/estudiantes.js"


const registerEstudianteController = {}


registerEstudianteController.register = async (req, res ) => {
    try {
        //Solicitamos nuestros datos

        const {name,lastname,email,password,birthdate,phone,grade,isVerified,timeOut} = req.body

        //Validamos si ya el correo existe

        const existEstudiante = await estudianteModel.findOne({email})


        if (existEstudiante) {
            return res.status(400).json({message: "El estudiante ya existe"})
        }


        //Encriptamos la contraseña

        const passwordHashed = await bcryptjs.hash(password,10)


        const randomCode  = crypto.randomBytes(3).toString("hex")

        const token = jsobwebtoken.sing(

            {randomCode, name, lastname, email, password: passwordHashed, birthdate, isVerified, timeOut},


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


registerEstudianteController.verifyCode = async (req,res) => {
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
            birthdate,
            phone,
            grade,
            loginAttemps,
            timeOut
        } = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid Code"})
        }

        const newEstudiante = estudianteModel({
            name,
            lastname,
            email,
            password,
            birthdate,
            phone,
            grade,
            isVerified: true
        })

        await newEstudiante.save()

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Estudiante registrado"})

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


export default registerEstudianteController;