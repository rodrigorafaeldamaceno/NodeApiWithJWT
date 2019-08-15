
const User = require('../model/User')

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
            return res.send({ user })
        } catch (e) {
            return res.status(400).send({ error: 'Registration failed!' })
        }
    }
}