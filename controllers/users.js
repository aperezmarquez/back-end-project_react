// CONTROLLER USER
const { matchedData } = require('express-validator') 
const { usersModel } = require('../models/index')
const { handleHttpError } = require("../utils/handleError")

const getUsers = async (req, res) => {
    try {
        const data = await usersModel.find({})
        res.send({data})
    } catch (err) {
        console.log(err)
    }
}

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
        handleHttpError(res, "ERROR_GET_USER" + err, 402)
    }
}

const createUser = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await usersModel.create(body)
        res.send({data})
    } catch (err) {
        handleHttpError(res, "ERROR_CREATE_USER" + err)
    }
}

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
        console.log(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const {mail} = matchedData(req)
        const data = await usersModel.findOneAndDelete({mail:mail})
        res.send({data})
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }
