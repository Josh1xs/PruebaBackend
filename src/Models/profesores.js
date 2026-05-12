import { Schema, model } from "mongoose";


 const maestrosSchema = new Schema({
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
    phone: {
        type: Number
    },    
    speciality: {
        type: String
    },
    isVerified : {
        type: Boolean
    },
    isActive : {
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

 export default model("maestros", maestrosSchema)