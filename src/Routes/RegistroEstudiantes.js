import express from "express"
import registerEstudianteController from "../Controllers/RegistroControllerEstudiantes.js"



const router = express.Router()


router.route("/")
.post(registerEstudianteController.register)


router.route("/verifyCodeEmail")
.post(registerEstudianteController.verifyCode)


export default router;

