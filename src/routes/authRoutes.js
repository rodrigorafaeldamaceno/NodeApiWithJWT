const express = require('express')
const routes = express.Router()
const authController = require('../controller/authController')


routes.get('/',  (req, res) => {
    return res.json({ auth: "is work" })
})

routes.post('/register', authController.store)

routes.post('/authenticate', authController.auth)


module.exports = routes