import materiasModel from "../Models/materias.js"


const MateriasController = {}



MateriasController.getMaterias = async(req,res) => {
    
    try{

        const materias = await materiasModel.find()
        return res.status(200).json(materias)

    } catch (error) {

        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    
    }

}

MateriasController.insertMaterias = async(req, res) => {

    try {
        const {subjectName, idMaestro, isAvailable} = req.body

        if(!subjectName || !isAvailable) {
            return res.status(400).json({message: "Faltan campos"})
        
        }

        const newMateria = new materiasModel({subjectName,idMaestro,isAvailable})

        await newMateria.save();
    
        res.status(200).json({status: "Success", message: "Materia guardada con exito brother"})

    } catch (error) {
  console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


MateriasController.putMateria = async(req,res) =>{
    try{

        let {
            subjectName,
            idMaestro,
            isAvailable
        } = req.body


        //Sanitizamos y validamos
        subjectName = subjectName?.trim()


        if(subjectName < 3 || subjectName.length > 20){
            return res.status(400).json({message: "Porfavor insertar un nombre valido"})
        }

        //Actualizamos
        const putMateria = await materiasModel.findByIdAndUpdate(req.params.id,{
             subjectName,
            idMaestro,
            isAvailable
            } ,{new: true},
        )
    

     if(!putMateria){
        return res.status(404).json({message: "No encontrado"})
    }

    return res.status(200).json({message: "ACTUALIZADO"})

    } catch (error)  {
          console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


MateriasController.deleteMateria = async (req,res ) => {
    try {
         const deleteMateria = materiasModel.findByIdAndDelete(req.params.id)

        if(!deleteMateria) {
            return res.status(400).json({message: "No encontrado"})
        }

            return res.status(200).json({message: "ELIMINADO"})


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


export default MateriasController;