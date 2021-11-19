const { user } = require('../../models')

const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register session
exports.register = async (req, res) => {
    const schema = Joi.object({
        userName: Joi.string().min(4).required(),
        email: Joi.string().email().min(8).required(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: { message: error.details[0].message }
        })
    }

    try {
        const allUser = await user.findAll()
        const nameExist = allUser.find(item => req.body.userName === item.userName)
        const emailExist = allUser.find(item => req.body.userName === item.email)

        if (nameExist) {
            return res.status(400).send({
                status: "failed",
                message: "User name already exist"
            })
        } else if (emailExist) {
            return res.status(400).send({
                status: "failed",
                message: "Email already exist"
            })
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const { userName, email } = req.body

        const newUser = await user.create({
            userName,
            email,
            password: hashedPassword
        })

        res.send({
            status: "success",
            user: {
                userName: newUser.userName,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server Error"
        })
    }
}

exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(8).required(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body)
    
    if (error) {
        return res.status(400).send({
            error: { message: error.details[0].message }
        })
    }

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email
            }, 
            attributes: {
                exclude: ["createdAt", "updatedAt"] 
            } 
        })  

        const isPassValid = await bcrypt.compare(req.body.password, userExist.password) 

        if (!isPassValid) {
            return res.status(400).send({
                status: "failed",
                message: "Credential is invalid"
            })
        }

        // generate token
        const token = jwt.sign({ id: userExist.id, email: userExist.email }, process.env.TOKEN_KEY)

        res.send({
            status: "success",
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server Error"
        })
    }
}