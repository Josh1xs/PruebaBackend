import categoriaModel from "../Models/categoriastarea.js"


const categoriaController = {}



categoriaController.getCategoria = async(req,res) => {
    
    try{

        const categoria = await categoriaModel.find()
        return res.status(200).json(categoria)

    } catch (error) {

        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    
    }

}

categoriaController.insertCategoria = async(req, res) => {

    try {
        const {name, description, color, isActived} = req.body

        if(!name || !description || !isActived) {
            return res.status(400).json({message: "Faltan campos"})
        
        }

        const newCategoria = new categoriaModel({name, description, color, isActived})

        await newCategoria.save();
    
        res.status(200).json({status: "Success", message: "Categoria guardada con exito brother"})

    } catch (error) {
  console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


categoriaController.putCategoria = async(req,res) =>{
    try{

        let {
        name, description, color, isActived
        } = req.body


        //Sanitizamos y validamos
        name = name?.trim()


        //Validamos
        if(!name || !description) {
            return res.status(400).json({message: "Campos requeridos"})
        }

        if(name < 3 || name.length > 20){
            return res.status(400).json({message: "Porfavor insertar un nombre valido"})
        }

        //Actualizamos
        const putCategoria = await categoriaModel.findByIdAndUpdate(req.params.id,{
          name, description, color, isActived
            } ,{new: true},
        )
    

    if(!putCategoria){
        return res.status(404).json({message: "No encontrado"})
    }

    return res.status(200).json({message: "ACTUALIZADO"})

    } catch (error)  {
          console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


categoriaController.deleteCategoria = async (req,res ) => {
    try {
         const deleteCategoria = categoriaModel.findByIdAndDelete(req.params.id)

        if(!deleteCategoria) {
            return res.status(400).json({message: "No encontrado"})
        }

            return res.status(200).json({message: "ELIMINADO"})


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


export default categoriaController;