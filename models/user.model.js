const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, required:true}
},
{
    collection: 'usersDB'
})

const model = mongoose.model('userDB', User)


module.exports = model