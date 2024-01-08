const mongoose = require('mongoose');

const newsLetterSchema = mongoose.Schema({

    email: { type: String, require: true, unique: true }

}, { timestamps: true })

module.exports = mongoose.model("NewsLetter", newsLetterSchema)