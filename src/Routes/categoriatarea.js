import express, {Router} from "express"
import categoriaController from "../Controllers/categoriaController.js"


const router = express.Router()


router.route("/")

.get(categoriaController.getCategoria)
.post(categoriaController.insertCategoria)

router.route("/:id")

.put(categoriaController.putCategoria)
.delete(categoriaController.deleteCategoria)




export default router;