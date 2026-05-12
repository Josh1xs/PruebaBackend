import mongoose, { Schema, model } from "mongoose";


 const materiasSchema = new Schema({
    subjectName: {
        type: String,
    },
    idMaestro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "maestros"
    },
    isAvailable: {
        type: String
    }
},{
    timestamps: true,
    strict: false 
 })

 export default model("materias", materiasSchema)