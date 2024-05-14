// ROUTE COMERCIOS
const express = require("express")
const { getItems, createItem, getItem, updateItem, deleteItem } = require("../controllers/comercios")
const router = express.Router()
const { validatorCreateCommerce, validatorCIFCommerce, validatorUpdateCommerce } = require("../validators/comercios")
const { authMiddleware } = require("../middleware/session")
const { checkRol } = require("../middleware/rol")

/**
 * @openapi
 * /api/comercio:
 *  get:
 *      tags:
 *      - Comercios
 *      summary: Returns every commerce
 *      description: Gives a list of every commerce in mongoDB
 *      responses:
 *          '200':
 *              description: Gives a list back with every commerce
 *          '402':
 *              description: Couldn't return the commerces
 */
// Enviamos la peticion a la funcion getItems del controller de comercios
router.get("/", getItems)


/**
 * @openapi
 * /api/comercio/:cif:
 *  get:
 *      tags:
 *      - Comercios
 *      summary: Returns specified commerce
 *      description: Gives the commerce with the same cif you specified
 *      responses:
 *          '200':
 *              description: Gives back a commerce
 *          '402':
 *              description: Couldn't return the commerce
 */
// Enviamos la peticion a la funcion getItem del controller de comercios
// Antes de enviarlo comprobamos que el cif que se ha introducido en la peticion es valido
router.get("/:cif", authMiddleware, validatorCIFCommerce, getItem)


/**
 * @openapi
 * /api/comercio/:
 *  post:
 *      tags:
 *      - Comercios
 *      summary: Creates a new commerce
 *      description: Creates a commerce with the data you set
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schema/Commerce"
 *      responses:
 *          '200':
 *              description: Creates a commerce
 *          '402':
 *              description: Couldn't create the commerce
 *      security:
 *          - bearerAuth: []
 */
// Comprobamos que estan todos los campos necesarios para crear un comercio desde el validator
// Una vez comprobados los datos enviamos la peticion al createItem del controller de comercios
router.post("/", validatorCreateCommerce, createItem)


/**
 * @openapi
 * /api/comercio/:cif:
 *  patch:
 *      tags:
 *      - Comercios
 *      summary: Updates a commerce
 *      description: Updates the commerce with the same cif you specified
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schema/Commerce"
 *      responses:
 *          '200':
 *              description: Updates a commerce
 *          '402':
 *              description: Couldn't update the commerce
 *      security:
 *          - bearerAuth: []
 */
// Comprobamos que el cif sea correcto y que exista alguna variable que modificar
// Envaimos la peticion al updateItem del controller de comercios
router.patch("/:cif", validatorUpdateCommerce, updateItem)


/**
 * @openapi
 * /api/comercio/:cif:
 *  delete:
 *      tags:
 *      - Comercios
 *      summary: Deletes a commerce
 *      description: Deletes the commerce with the same cif you specified
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schema/Commerce"
 *      responses:
 *          '200':
 *              description: Deletes a commerce
 *          '402':
 *              description: Couldn't delete the commerce
 *      security:
 *          - bearerAuth: []
 */
// Comprobamos que el cif sea correcto
// Enviamos la peticion al deleteItem del controller de comercios
router.delete("/:cif", validatorCIFCommerce, deleteItem)

// Exportamos el router para usarlo desde app.js
module.exports = router
