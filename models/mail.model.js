const mongoose = require('mongoose')

const Mail = new mongoose.Schema({
    from: { type: String, required: true },
    recipient: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    messageCreationTime: { type : Date, default: new Date() },
    isRead: { type: Boolean, default: false },
},
{
    collection: 'messagesDB'
})

const model = mongoose.model('messagesDB', Mail)


module.exports = model