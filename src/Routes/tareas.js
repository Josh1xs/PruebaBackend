import express, {Router} from "express"
import TareasController from "../Controllers/tareaController.js"


const router = express.Router()


router.route("/")

.get(TareasController.getTareas)
.post(TareasController.insertTareas)

router.route("/:id")

.put(TareasController.putTarea)
.delete(TareasController.deleteTarea)




export default router;