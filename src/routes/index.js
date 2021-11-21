const express = require('express')
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todo')

const router = express.Router()

router.get('/todos', getTodos)
router.post('/todo', addTodo)
router.patch('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

// login register
// router.post('/register', register)
// router.post('/login', login)

module.exports = router