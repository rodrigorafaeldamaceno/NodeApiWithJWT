const port = 3000
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const routes = require('./routes')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/auth', routes)

console.log(`Servidor online em http://localhost:${port}`)
server.listen(port)