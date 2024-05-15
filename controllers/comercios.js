// CONTROLLER PARA COMERCIOS
// DEFINIMOS EL MATCHED DATA
// Funcion de express-validator que nos sirve para poner en uso los validators
const { matchedData } = require("express-validator")
// Cogemos el modelo de comercio que hemos creado en models/nosql
const { commerceModel, usersModel } = require("../models/index")
// Funcion de errores creada en utils, con esta funcion manejaremos todos los errores
const { handleHttpError } = require("../utils/handleError")

// GET ALL ITEMS FROM DB
const getItems = async (req, res) => {
    try {
        const data = await commerceModel.find({}).sort({cif:1})
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS_COMMERCE" + error)
    }
}

// CREACION DE COMERCIO
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
const getItem = async (req, res) => {
    try {
        const { cif } = matchedData(req)
        
        const data = await commerceModel.findOne({ cif:cif })

        if (!data) {
            handleHttpError(res, "COMMERCE_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM_COMMERCE" + error)
    }
}

// UPDATE ITEM BY CIF
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

// CHECK THE INTERESTS OF USERS IN COMMERCE CITY
const checkInterestsUsers = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        
        if (!token) {
            handleHttpError(res, "NO_TOKEN", 402)
        }

        const data = await usersModel.find({city: token.city})

        if (!data) {
            handleHttpError(res, "NO_USERS_IN_CITY", 404)
            return
        }

        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_GET_USERS_IN_CITY" + error)
    }
}

// DELETE ITEM BY CIF
// Elimina de la base de datos un comercio por el cif indicado en la peticion
const deleteItem = async (req, res) => {
    try {
        const { cif } = matchedData(req) 

        const data = await commerceModel.findOneAndDelete({ cif:cif })

        if (!data) {
            handleHttpError(res, "COMMERCE_NOT_FOUND", 404)
            return
        }

        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM_COMMERCE" + error)
    }
}

// Exportamos todas las funciones para usarlas dentro de routes
module.exports = { getItems, createItem, getItem, getItemsInCity, updateItem, checkInterestsUsers, deleteItem }
