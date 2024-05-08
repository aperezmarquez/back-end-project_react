// COMPROBACION DE DATOS
const { validationResult } = require("express-validator")

// Comprobamos los resultados que hemos sacado en el validator de comercios
// Si todo esta correcto realizamos la peticion correctamente
// En caso de que no enviamos un error 403
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send({ errors: err.array() })
    }
}

// Exportamos la funcion para usarla desde el validator
module.exports = validateResults
