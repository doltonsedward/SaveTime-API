const { todo } = require('../../models')

exports.getTodos = async (req, res) => {
    try {
        const response = await todo.findAll()

        res.send({
            status: "success",
            todos: response
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.addTodo = async (req, res) => {
    try {
        const response = await todo.create({ ...req.body })

        res.send({
            status: "success",
            todo: response.name
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        
        await todo.update({...req.body}, {
            where: {
                id
            }
        })
        
        res.send({
            status: "success",
            todo: req.body.name
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params

        await todo.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Delete todo id: ${id} finished`
        })
    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}