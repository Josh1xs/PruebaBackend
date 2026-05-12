import express, {Router} from "express"
import loginEstudiantesController from "../Controllers/loginControllerEstudiantes.js"


const router = express.Router()


router.route("/")

.post(loginEstudiantesController.login)


export default router;