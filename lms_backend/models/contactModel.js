const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({

    name: { type: String, require: true, index: true },
    email: { type: String, require: true },
    mobile: { type: String, require: true },
    subject: { type: String, require: true },
    profession: { type: String, require: true },
    comment: { type: String, require: true },
    status: { type: String, default:"Submitted"},

}, { timestamps: true })

module.exports = mongoose.model("Contact", contactSchema)