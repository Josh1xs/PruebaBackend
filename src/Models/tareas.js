import { Schema, model } from "mongoose";


 const tareasSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dueDate : {
        type: Date
    },
    priority: {
        type: String
    },    
    status: {
        type: Boolean
    }
},{
    timestamps: true,
    strict: false 
 })

 export default model("tareas", tareasSchema)