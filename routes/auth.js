const express = require("express")
const router = express.Router()
const { validatorRegister, validatorLogin } = require("../validators/auth")
const { registerCtrl, loginCtrl } = require("../controllers/auth")
const { validateGetDeleteUser, validateUpdateUser } = require("../validators/users")
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/users")

/**
 * @openapi
 * /api/auth/register:
 *  post:
 *      tags:
 *      - Register
 *      summary: Registers a user
 *      description: Uses a validator to register, checking if the length of the name is correct, if the mail in fact is a mail or if the password legth is correct
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Register"
 *      responses:
 *          '200':
 *              description: The user is registered in the DB
 *          '402':
 *              description: User not registered correctly
 *      security:
 *          - bearerAuth: []
 */
router.post("/register", validatorRegister, registerCtrl)

router.post("/login", validatorLogin, loginCtrl)

router.get("/users", getUsers)

router.get("/users/:mail", validateGetDeleteUser, getUser)

router.patch("/users/:mail", validateUpdateUser, updateUser)

router.delete("/users/:mail", validateGetDeleteUser, deleteUser)

module.exports = router
