const express = require('express')
const routes = express.Router()
const authController = require('./controller/authController')


routes.get('/', (req, res) => {
    return res.json({ server: "online" })
})

routes.post('/register', authController.store)


module.exports = routes