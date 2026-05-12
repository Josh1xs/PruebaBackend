import { Schema, model } from "mongoose";


 const estudiantesSchema = new Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
    type: String

    },
    birthdate : {
        type: Date
    },
    phone: {
        type: String
    },    
    grade: {
        type: String
    },
    isVerified : {
        type: Boolean
    },
    loginAttemps: {
        type: Number
    },
    timeOut : {
        type: Date
    },
},{
    timestamps: true,
    strict: false 
 })

 export default model("estudiantes", estudiantesSchema)