// CONTROLLER USER
const { matchedData } = require('express-validator') 
const { usersModel } = require('../models/index')
const { handleHttpError } = require("../utils/handleError")

// GET ALL USERS IN MONGDB
const getUsers = async (req, res) => {
    try {
        const data = await usersModel.find({})
        if (!data) {
            handleHttpError(res, "NO_USERS", 404)
            return
        }

        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_USERS" + err, 403)
    }
}

// GET USER BY MAIL IN MONGODB
const getUser = async (req, res) => {
    try {
        const { mail } = matchedData(req)
        const data = await usersModel.findOne({ mail:mail})
        if (!data) {
            handleHttpError(res, "USER_NOT_FOUND", 404)
            return
        }

        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_GET_USER" + err, 403)
    }
}

// UPDATES A USER (ONLY CITY, INTERESTS, OFERTS)
const updateUser = async (req, res) => {
    try {
        const {mail, ...body} = matchedData(req)
        const data = await usersModel.findOneAndUpdate({mail:mail}, body, {returnOriginal: false})

        if (!data) {
            handleHttpError(res, "USER_NOT_UPDATED", 403)
            return
        }

        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_UPDATE_USER" + err, 403)
    }
}

// GET OFERTS OF COMMERCES IN THE CITY OF USER
const getOferts = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ').pop()

        if (!token.oferts) {
            handleHttpError(res, "OFFERTS_DEACTIVE", 402)
            return
        }

        const data = await commerceModel.find({city: token.city})

        if (!data) {
            handleHttpError(res, "NO_COMMERCE_IN_CITY", 404)
            return
        }

        res.send({data})
    } catch (error) {
        handleHttpError(res, "ERROR_OFERTS" + error, 403)
    }
}

// DELETES A USER BY MAIL
const deleteUser = async (req, res) => {
    try {
        const {mail} = matchedData(req)
        const data = await usersModel.findOneAndDelete({mail:mail})
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_DELETE_USER" + err, 403)
    }
}

module.exports = { getUsers, getUser, getOferts, updateUser, deleteUser }
