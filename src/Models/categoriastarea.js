import { Schema, model } from "mongoose";


 const categoriaShcema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    color: {
        type: String
    },
    isActived: {
        type: Boolean
    }
    
},{
    timestamps: true,
    strict: false 
 })
 

 export default model("categorias", categoriaShcema)