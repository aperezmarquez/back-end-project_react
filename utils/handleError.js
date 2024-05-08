// MANEJO DE ERRORES
// Manejamos todos los errores desde este handle
const handleHttpError = (res, message, code = 403) => {
    res.status(code).send(message)
}

// Exportamos la funcion para usarla donde queramos
module.exports = { handleHttpError }
