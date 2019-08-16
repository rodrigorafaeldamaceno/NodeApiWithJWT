const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const { host, port, user, pass } = require('../config/mail.json')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user, pass
    }
});
const handlebarOptions = {
    viewEngine: 'handlebars',
    //partialsDir: path.resolve('./resources/mail'),
    viewPath: path.resolve('./resources/mail'),
    extName: '.html'
}

transport.use('compile', hbs(handlebarOptions))


module.exports = transport