const express = require('express')
const routes = express.Router()
const authMiddleware = require('../app/middlewares/auth')

routes.use(authMiddleware)

routes.get(
    '/', (req, res) => {
    res.send({ status: 'Is work', user: req.userId })
})


module.exports = routes