const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        //erro de altorização
        return res.status(401).send({ erros: "No token provides" })
    }

    //dividir o token

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token erros' })
    }

    const [scheme, token] = parts


    //regex, precisa ter a palavra Bearer
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' })

        //passa a informação do id pro controller
        req.userId = decoded.id
        return next()
    })

}