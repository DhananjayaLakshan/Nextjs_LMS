const mongoose = require('mongoose')

const docCatSchema = mongoose.Schema({

    title: { type: String, required: true }    

}, { timestamps: true })

module.exports = mongoose.model("DocumentCategory", docCatSchema)