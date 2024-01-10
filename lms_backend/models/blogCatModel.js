const mongoose = require('mongoose')

const blogCatSchema = mongoose.Schema({

    title: { type: String, required: true }

}, { timestamps: true })

module.exports = mongoose.model("BlogCategory", blogCatSchema)