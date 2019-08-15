const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://rsouza:pass123@cluster0-dcv5q.mongodb.net/test?retryWrites=true&w=majority",
    { useMongoClient: true })



module.exports = mongoose

