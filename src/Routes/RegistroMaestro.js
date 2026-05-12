import express from "express"
import registerMaestroController from "../Controllers/RegistroControllerMaestros.js"



const router = express.Router()


router.route("/")
.post(registerMaestroController.register)


router.route("/verifyCodeEmail")
.post(registerMaestroController.verifyCode)


export default router;

