
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')


//gera um token com um valor unico
const generateToken = (params = {}) => {
    const token = jwt.sign({ id: params }, authConfig.secret, {
        //tempo em segundos para expiração
        expiresIn: 3600
    })

    return token
}


module.exports = {
    async store(req, res) {
        //console.log(req.body)
        const { name, email, pass } = req.body
        console.log(name)
        try {
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'User already exists' })
            }
            const user = await User.create({ name, email, pass })

            user.pass = undefined
            return res.send({
                user,
                token: generateToken({ id: user.id })
            })
        } catch (e) {
            return res.status(400).send({ error: 'Registration failed!' })
        }
    },
    async auth(req, res) {
        const { email, pass } = req.body

        const user = await User.findOne({ email }).select('+pass')

        if (!user) {
            return res.status(400).send({ error: 'User not found!' })
        }

        if (!await bcrypt.compare(pass, user.pass)) {
            return res.status(400).send({ erros: 'Invalid password!' })
        }

        user.pass = undefined

        return res.send({
            user,
            token: generateToken({ id: user.id })
        })

    }
}