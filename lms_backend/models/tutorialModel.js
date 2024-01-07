const mongoose = require('mongoose')

var tutorialSchema = mongoose.Schema({

    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    tutorialCategory: { type: String, require: true },
    tutorialCategorySlug: { type: String, require: true },
    topicName: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    keywords: { type: [], required: true },

}, { timestamps: true })


module.exports = mongoose.model("Tutorial", tutorialSchema)