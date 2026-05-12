import express, {Router} from "express"
import recoveryPasswordControllerMaestros from "../Controllers/recuperarContraseñaMaestros.js"



const router = express.Router()


router.route("/requestCode")
.post(recoveryPasswordControllerMaestros.requestCode)


router.route("/verifyCode")
.post(recoveryPasswordControllerMaestros.verifyCode)


router.route("/newPassword")
.post(recoveryPasswordControllerMaestros.newPassword)


export default router;

