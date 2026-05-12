import mongoose  from "mongoose";

mongoose.connect("mongodb://localhost:27017/Escuela")


const connection = mongoose.connection

connection.on("open", () =>{
    console.log("Base de datos conectada")
})

connection.on("disconnected",() => {
    console.log("Desconectado de la base de datos")
})

connection.on("error", (error)=>{
    console.log("Error en la conexion a la Base de datos:" + error)
})

