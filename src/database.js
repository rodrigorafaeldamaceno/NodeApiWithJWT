const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rsouza:rsouza123@tindevcluster-gxzea.mongodb.net/database?retryWrites=true&w=majority',
    { useNewUrlParser: true })

module.exports = mongoose