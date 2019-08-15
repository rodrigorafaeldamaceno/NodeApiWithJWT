const port = 3000
const express = require('express')
const bodyParser = require('body-parser')

const server = express()
const routes = require('./routes')


server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use(routes)

console.log(`Servidor online na porta ${port}`)
server.listen(port)