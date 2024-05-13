// CONTROLLER PARA COMERCIOS
// DEFINIMOS EL MATCHED DATA
// Funcion de express-validator que nos sirve para poner en uso los validators
const { matchedData } = require("express-validator")
// Cogemos el modelo de comercio que hemos creado en models/nosql
const { commerceModel } = require("../models/index")
// Funcion de errores creada en utils, con esta funcion manejaremos todos los errores
const { handleHttpError } = require("../utils/handleError")

// GET ALL ITEMS FROM DB
// Con esta funcion devolvemos todos los comercios existentes al cliente que hizo la peticion GET
const getItems = async (req, res) => {
    try {
        const data = await commerceModel.find({}).sort({cif:1})
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS_COMMERCE" + error)
    }
}

// CREACION DE COMERCIO
// Funcion para crear un comercio en la base de datos, usando el commerceModel
const createItem = async (req, res) => {
    try {
        // Necesitamos el validator de comercios para hacer matchedData
        const body = matchedData(req)
        const data = await commerceModel.create(body)
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEM_COMMERCE" + error)
    }
}

// GET ITEM BY CIF
// A traves del cif indicado por el cliente buscamos en el base de datos un comercio con este cif y se lo devolvemos
const getItem = async (req, res) => {
    try {
        const { cif } = matchedData(req)
        
        const data = await commerceModel.findOne({ cif:cif })
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM_COMMERCE" + error)
    }
}

// UPDATE ITEM BY CIF
// Funcion para actualizar un comercio, a traves del cif que se indica en la url de la peticion PATCH
const updateItem = async (req, res) => {
    try {
        const { cif, ...body } = matchedData(req)
        
        const data =  await commerceModel.findOneAndUpdate({cif:cif}, body, {returnOriginal: false})
        if (!data) {
            handleHttpError(res, "ERROR_NOT_UPDATED", 403)
            return
        }

        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ITEM_COMMERCE" + error)
    }
}

// DELETE ITEM BY CIF
// Elimina de la base de datos un comercio por el cif indicado en la peticion
const deleteItem = async (req, res) => {
    try {
        const { cif } = matchedData(req) 

        const data = await commerceModel.findOneAndDelete({ cif:cif })
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM_COMMERCE" + error)
    }
}

// Exportamos todas las funciones para usarlas dentro de routes
module.exports = { getItems, createItem, getItem, updateItem, deleteItem }
