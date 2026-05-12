import tareasModel from "../Models/tareas.js"


const TareasController = {}



TareasController.getTareas = async(req,res) => {
    
    try{

        const tareas = await tareasModel.find()
        return res.status(200).json(tareas)

    } catch (error) {

        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    
    }

}

TareasController.insertTareas = async(req, res) => {

    try {
        const {title, description, dueDate, priority, status} = req.body

        if(!title || !description || !priority) {
            return res.status(400).json({message: "Faltan campos"})
        
        }

        const newTarea = new tareasModel({title, description, dueDate, priority, status})

        await newTarea.save();
    
        res.status(200).json({status: "Success", message: "Tarea guardada con exito brother"})

    } catch (error) {
  console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


TareasController.putTarea = async(req,res) =>{
    try{

        let {
           title, description, dueDate, priority, status
        } = req.body


        //Sanitizamos y validamos
        title = title?.trim()


        //Validamos
        if(!title || !description) {
            return res.status(400).json({message: "Campos requeridos"})
        }

        if(title < 3 || title.length > 20){
            return res.status(400).json({message: "Porfavor insertar un nombre valido"})
        }

        //Actualizamos
        const putTarea = await tareasModel.findByIdAndUpdate(req.params.id,{
            title, description, dueDate, priority, status
            } ,{new: true},
        )
    

    if(!putTarea){
        return res.status(404).json({message: "No encontrado"})
    }

    return res.status(200).json({message: "ACTUALIZADO"})

    } catch (error)  {
          console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


TareasController.deleteTarea = async (req,res ) => {
    try {
         const deleteTarea = tareasModel.findByIdAndDelete(req.params.id)

        if(!deleteTarea) {
            return res.status(400).json({message: "No encontrado"})
        }

            return res.status(200).json({message: "ELIMINADO"})


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


export default TareasController;