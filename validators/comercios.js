// VALIDATOR DE COMERCIOS
const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

// Comprobamos que todas las variables necesarias para crear un comercio existen y no estan vacias
const validatorCreateCommerce = [
    check("nombre").exists().notEmpty(),
    check("cif").exists().notEmpty(),
    check("direccion").exists().notEmpty(),
    check("mail").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    // Ademas, de que exista y no este vacio comprobamos que sea un Int el id
    check("id").exists().notEmpty().isInt(),
    // Despues de hacer los checks validamos los resultados obtenidos de estos checks
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Comprobamos unicamente el cif como hemos hecho con el validator del create, pero para el getItem y el deleteItem
const validatorCIFCommerce = [
    check("cif").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req,res,next)
    }
]

// Comprobamos que el cif exista y no este vacio 
// A parte, checkamos las otras variables que se pueden cambiar para poder usarlas
const validatorUpdateCommerce = [
    check("cif").exists().notEmpty(),
    check("nombre"),
    check("direccion"),
    check("mail"),
    check("telefono"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

// Exportamos los tres validators para usarlos en el route
module.exports = { validatorCreateCommerce, validatorCIFCommerce, validatorUpdateCommerce }
