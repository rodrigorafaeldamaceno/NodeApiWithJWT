
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const mailer = require('../../modules/mailer')


//gera o token para redfinição de senha
const crypto = require('crypto')



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

    },
    async forgotPassword(req, res) {
        const { email } = req.body

        try {
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).send({ error: 'User not found!' })
            }

            //gera o token e salva no banco
            const token = crypto.randomBytes(20).toString('hex')
            let now = new Date()
            console.log("now:", now.getHours())

            now.setHours(now.getHours() + 1)

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })
            //console.log(token, now)
            mailer.sendMail({
                to: email,
                from: 'no-reply@rsouza.com.br',
                template: '/auth/forgotPassword',
                context: { token }
            }), (err) => {
                if (err) return res.status(400).send({ error: 'Cannot send forgot password email' })

                return res.send()
            }

        } catch (err) {
            console.log(err)
            res.status(400).send({ error: 'Error on forgot password' })
        }
    }
}