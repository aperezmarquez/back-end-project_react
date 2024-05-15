const express = require("express")
const router = express.Router()
const { validatorRegister, validatorLogin } = require("../validators/auth")
const { registerCtrl, loginCtrl } = require("../controllers/auth")
const { validateGetDeleteUser, validateUpdateUser } = require("../validators/users")
const { getUsers, getUser, getOferts, updateUser, deleteUser } = require("../controllers/users")
const { authMiddleware } = require("../middleware/session")
const { checkRol } = require("../middleware/rol")

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



/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *      - Login
 *      summary: Logins a user
 *      description: Uses a validator to login, checking if the mail in fact is a mail or if the password legth is correct
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Login"
 *      responses:
 *          '200':
 *              description: The user is registered in the DB
 *          '404':
 *              description: The user doesn't exist
 *          '401':
 *              description: Invalid password
 *      security:
 *          - bearerAuth: []
 */
router.post("/login", validatorLogin, loginCtrl)


/**
 * @openapi
 * /api/auth/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Returns every registered user
 *      description: Gives a list with every user in registered in mongoDB
 *      responses:
 *          '200':
 *              description: Gives a list back with every user
 *          '402':
 *              description: Couldn't return the users
 */
router.get("/users", authMiddleware, getUsers)


/**
 * @openapi
 * /api/auth/users/:mail:
 *  get:
 *      tags:
 *      - User
 *      summary: Returns the user that matches the mail
 *      description: The users adds the mail he is searching for and this returns the user that matches that mail
 *      responses:
 *          '200':
 *              description: Returns the user correctly
 *          '404':
 *              description: User not found
 *          '402':
 *              description: An error occurred trying to retreive the user
 */
router.get("/users/:mail", authMiddleware, validateGetDeleteUser, getUser)


/**
 * @openapi
 * /api/auth/users/:mail:
 *  patch:
 *      tags:
 *      - User
 *      summary: Registers a user
 *      description: Uses a validator to register, checking if the length of the name is correct, if the mail in fact is a mail or if the password legth is correct
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Users"
 *      responses:
 *          '200':
 *              description: The user is registered in the DB
 *          '402':
 *              description: User not registered correctly
 *      security:
 *          - bearerAuth: []
 */
router.patch("/users/:mail", authMiddleware, validateUpdateUser, updateUser)


/**
 * @openapi
 * /api/auth/users/oferts:
 *  get:
 *      tags:
 *      - User
 *      summary: Returns a list of commerces
 *      description: The user checks his oferts and gets in return a list of commerces in his city
 *      responses:
 *          '200':
 *              description: Returns the list correctly
 *          '404':
 *              description: No commerces found
 *          '402':
 *              description: Error with user token
 *          '403':
 *              description: An error occurred trying to retreive the user
 */
router.get("/users/oferts", authMiddleware, getOferts)


/**
 * @openapi
 * /api/auth/users/:mail:
 *  delete:
 *      tags:
 *      - User
 *      summary: Registers a user
 *      description: Uses a validator to register, checking if the length of the name is correct, if the mail in fact is a mail or if the password legth is correct
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Users"
 *      responses:
 *          '200':
 *              description: The user is registered in the DB
 *          '402':
 *              description: User not registered correctly
 *      security:
 *          - bearerAuth: []
 */
router.delete("/users/:mail", authMiddleware, validateGetDeleteUser, deleteUser)

module.exports = router
