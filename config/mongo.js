// DEFINIMOS MONGOOSE
const mongoose = require("mongoose")
// DEFINIMOS LA FUNCION DBCONNECT
// Con esta funcion nos conectamos a la BD de mongo
const dbConnect = () => {
    // Cogemos el link de la BD de nuestro .env
    const db_url = process.env.DB_URL
    mongoose.set("strictQuery", false)
    // Intentamos conectarnos a la BD y en caso de error muestra que ha pasado
    try {
        mongoose.connect(db_url)
    } catch (err) {
        console.err("Error conectando a la BD: ", err)
    }
    
    // Si nos hemos conectado mostramos por la terminal del servidor que estamos conectados
    mongoose.connection.on("connected", () => console.log("Conectado a la BD"))
}

// exportamos la funcion para poder usarla desde app.js
module.exports = dbConnect
