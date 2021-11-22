const express = require('express')
const { getTodos, addTodo, updateTodo, deleteTodo, getTodo } = require('../controllers/todo')

const router = express.Router()

router.get('/todos', getTodos)
router.get('/todo/:id', getTodo)
router.post('/todo', addTodo)
router.patch('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

// login register
// router.post('/register', register)
// router.post('/login', login)

module.exports = router