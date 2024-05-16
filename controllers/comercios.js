// CONTROLLER PARA COMERCIOS
// DEFINIMOS EL MATCHED DATA, MODELOS Y ERRORHANDLER
const { matchedData } = require("express-validator")
const { commerceModel, usersModel } = require("../models/index")
const { handleHttpError } = require("../utils/handleError")
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJwt")
const jwt = require("jsonwebtoken")

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
        req = matchedData(req)
        const password = await encrypt(req.password)

        const body = {...req, password}
        const dataCommerce = await commerceModel.create(body)
        dataCommerce.set("password", undefined, {strict: false})

        const data = {
            token: await tokenSign(dataCommerce),
            comercio: dataCommerce
        }
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEM_COMMERCE" + error)
    }
}

// LOGIN COMMERCE
const loginCommerce = async (req, res) => {
    try {
        req = matchedData(req)
        const commerce = await commerceModel.findOne({cif: req.cif})

        if (!commerce) {
            handleHttpError(res, "COMMERCE_NOT_FOUND", 404)
            return
        }

        const hashPassword = commerce.password
        const check = await compare(req.password, hashPassword)

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        commerce.set("password", undefined, {strict: false})
        const data = {token: await tokenSign(commerce), commerce}
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_COMMERCE" + error, 402)
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
        const token = jwt.decode(req.headers.authorization.split(' ').pop())
        console.log(token.city)
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
module.exports = { getItems, createItem, loginCommerce, getItem, updateItem, checkInterestsUsers, deleteItem }
