import express, {Router} from "express"
import recoveryPasswordControllerEstudiantes from "../Controllers/recuperarContraseñaEstudiantes.js"



const router = express.Router()


router.route("/requestCode")
.post(recoveryPasswordControllerEstudiantes.requestCode)


router.route("/verifyCode")
.post(recoveryPasswordControllerEstudiantes.verifyCode)


router.route("/newPassword")
.post(recoveryPasswordControllerEstudiantes.newPassword)


export default router;

