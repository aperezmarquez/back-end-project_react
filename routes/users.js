// ROUTE USERS
const express = require('express')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users')
const { validateCreateUser, validateGetDeleteUser, validateUpdateUser } = require('../validators/users')
const router = express.Router()

router.get('/', getUsers)

router.get('/:mail', validateGetDeleteUser, getUser)

// Crea user
router.post('/', validateCreateUser, createUser)

router.patch('/:mail', validateUpdateUser, updateUser)

router.delete('/:mail', validateGetDeleteUser, deleteUser)

module.exports = router
