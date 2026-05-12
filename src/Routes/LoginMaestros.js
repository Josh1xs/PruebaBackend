import express, {Router} from "express"
import loginMaestrosController from "../Controllers/loginControllerMaestros.js"


const router = express.Router()


router.route("/")

.post(loginMaestrosController.login)


export default router;