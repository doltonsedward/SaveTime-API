const express = require('express')
const { register, login } = require('../controllers/auth')
const { getUsers } = require('../controllers/user')

const router = express.Router()

router.get('/users', getUsers)

// login register
router.post('/register', register)
router.post('/login', login)

module.exports = router