const { user } = require('../../models')

exports.getUsers = async(req, res) => {
    try {
        const data = await user.findAll()

        if (!data.users) {
            return res.status(500).send({
                status: "failed",
                message: "Data is empty right now"
            })
        }

        res.send({
            status: "success",
            users: data
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server Error"
        })
    }
}