
const User = require('../model/User')

module.exports = {
    async store(req, res) {
        //console.log(req.body)
        const { name, email, pass } = req.body
        console.log(name)
        try {
            const user = await User.create({ name, email, pass })
            return res.send({ user })
        } catch (e) {
            return res.status(400).send({ error: 'Failed in register the user' })
        }
    }
}