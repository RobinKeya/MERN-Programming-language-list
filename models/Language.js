const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//language schema
const LanguageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Language = mongoose.model('language',LanguageSchema)