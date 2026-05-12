import express, {Router} from "express"
import MateriasController from "../Controllers/materiasController.js"


const router = express.Router()


router.route("/")

.get(MateriasController.getMaterias)
.post(MateriasController.insertMaterias)

router.route("/:id")

.put(MateriasController.putMateria)
.delete(MateriasController.deleteMateria)




export default router;