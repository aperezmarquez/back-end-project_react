// VALIDATOR DE USERS
const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validateCreateUser = [
    check("nombre").exists().notEmpty(),
    check("mail").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("role"),
    check("city"),
    check("interests"),
    check("oferts"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validateGetDeleteUser = [
     check("mail").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validateUpdateUser = [
    check("mail").exists().notEmpty(),
    check("city"),
    check("interests"),
    check("oferts"),
    check("role"),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validateCreateUser, validateGetDeleteUser, validateUpdateUser }
