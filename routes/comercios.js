// ROUTE COMERCIOS
const express = require("express")
const { getItems, createItem, getItem, updateItem, deleteItem } = require("../controllers/comercios")
const router = express.Router()
const { validatorCreateCommerce, validatorCIFCommerce, validatorUpdateCommerce } = require("../validators/comercios")
const { authMiddleware } = require("../middleware/session")
const { checkRol } = require("../middleware/rol")

// Enviamos la peticion a la funcion getItems del controller de comercios
router.get("/", getItems)

// Enviamos la peticion a la funcion getItem del controller de comercios
// Antes de enviarlo comprobamos que el cif que se ha introducido en la peticion es valido
router.get("/:cif", authMiddleware, validatorCIFCommerce, getItem)

// Comprobamos que estan todos los campos necesarios para crear un comercio desde el validator
// Una vez comprobados los datos enviamos la peticion al createItem del controller de comercios
router.post("/", authMiddleware, checkRol(["admin"]), validatorCreateCommerce, createItem)

// Comprobamos que el cif sea correcto y que exista alguna variable que modificar
// Envaimos la peticion al updateItem del controller de comercios
router.patch("/:cif", authMiddleware, validatorUpdateCommerce, updateItem)

// Comprobamos que el cif sea correcto
// Enviamos la peticion al deleteItem del controller de comercios
router.delete("/:cif", authMiddleware, checkRol(["admin"]), validatorCIFCommerce, deleteItem)

// Exportamos el router para usarlo desde app.js
module.exports = router
