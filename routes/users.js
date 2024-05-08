// ROUTE USERS
const express = require('express')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users')
const { validateCreateUser, validateGetDeleteUser, validateUpdateUser } = require('../validators/users')
const router = express.Router()

/**
 * @openapi
 * /api/user/:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in the System
 *      description: 
 *      responses:
 *          '200':
 *              description: Returns the users
 *          '500':
 *              description: Server error
 */
router.get('/', getUsers)

router.get('/:mail', validateGetDeleteUser, getUser)

/**
 * @openapi
 * /api/user/:
 *  post:
 *      tags:
 *      - User
 *      summary: Login user
 *      description: 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      "$ref": "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
// Crea user
router.post('/', validateCreateUser, createUser)

router.patch('/:mail', validateUpdateUser, updateUser)

router.delete('/:mail', validateGetDeleteUser, deleteUser)

module.exports = router
