const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { usersModel } = require("../models/index")
const { tokenSign } = require("../utils/handleJwt")

// REGISTERS A USER
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)

        const body = {...req, password}
        const dataUser = await usersModel.create(body)
        
        dataUser.set("password", undefined, {strict: false})

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_REGISTER_USER" + error, 402)
    }
}

// LOGIN
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ mail: req.mail }).select("password name role mail cit cityy")
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }

        const hashPassword = user.password
        const check = await compare(req.password, hashPassword)

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        user.set("password", undefined, {strict: false})
        const data = {token: await tokenSign(user), user}
        res.send(data)
    } catch (error) {
        handleHttpError(res, "ERROR_LOGIN_USER" + error, 402)
    }
}

// ADD ADMIN ROLE
const setAdminCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        if (!req.role) {
            handleHttpError(res, "NO_ROLE_USER")
            return
        }

        const newRole = req.role
        newRole.push("admin")
        const changed = await usersModel.findOneAndUpdate({mail: req.mail}, {role: newRole})
    } catch (error) {
        handleHttpError(res, "ERROR_SET_ADMIN" + error)
    }
}

module.exports = { registerCtrl, loginCtrl, setAdminCtrl }
