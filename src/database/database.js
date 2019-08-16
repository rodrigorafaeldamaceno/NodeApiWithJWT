const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://rsouza:rsouza123@tindevcluster-gxzea.mongodb.net/database?retryWrites=true&w=majority',
    {
        useCreateIndex: true,
        useNewUrlParser: true
    })

//functions deprecation
mongoose.set('useFindAndModify', false);

module.exports = mongoose