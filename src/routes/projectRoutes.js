const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.send({ status: 'Is work' })
})


module.exports = routes