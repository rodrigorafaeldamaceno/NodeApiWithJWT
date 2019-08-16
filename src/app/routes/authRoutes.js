const express = require('express')
const routes = express.Router()
const authController = require('../controllers/authController')


routes.get('/',  (req, res) => {
    return res.json({ auth: "is work" })
})

routes.post('/register', authController.store)

routes.post('/authenticate', authController.auth)

routes.post('/forgot_password', authController.forgotPassword)

module.exports = routes