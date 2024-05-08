// MODELO DEL COMERCIO
const mongoose = require("mongoose")

// ESQUEMA DE MODELO
// Creamos un modelo para los comercios:
// Asignamos las variable que necesitamos dentro del modelo
// Al asignar este esquema podremos construir todos los modelos siguiendo unas normas
const CommerceScheme = new mongoose.Schema(
{
    nombre: {
        type: String
    },
    cif: {
        type: String,
        unique: true
    },
    direccion: {
        type: String
    },
    mail: {
        type: String
    },
    telefono: {
        type: String
    },
    id: {
        type: Number,
        unique: true
    }
},
{
    timestamps: true,
    versionKey: false
}
)

// Exportamos el modelo
module.exports = mongoose.model("comercio", CommerceScheme)
