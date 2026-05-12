import express, {Router} from "express"
import logoutController from "../Controllers/logoutController.js"


const router = express.Router()


router.route("/")

.post(logoutController.logout)


export default router;