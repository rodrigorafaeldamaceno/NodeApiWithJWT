const port = 3000
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const authRoutes = require('./app/routes/authRoutes')
const projectRoutes = require('./app/routes/projectRoutes')


server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.get('/', (req, res) => {
    res.json({ servidor: 'online' })
})

server.use('/auth', authRoutes)
server.use('/projects', projectRoutes)

console.log(`Servidor online em http://localhost:${port}`)
server.listen(port)