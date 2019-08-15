const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.json({ server: "online" })
})


module.exports = routes