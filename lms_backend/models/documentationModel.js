const mongoose = require('mongoose');

const docsSchema = mongoose.Schema({

    title: { type: String, require: true},
    slug: { type: String, require: true},
    category: { type: String, require: true},
    type: { type: String, require: true},
    author: { type: String, default:"Dhananjaya"},
    content: { type: String, require: true},
    keywords: { type: [], require: true},
    doc_image: { type: String, default: "https://media.istockphoto.com/id/1454186568/vector/photo-coming-soon-no-photo-symbol-no-thumbnail-available-default-thumbnail-available-photo.jpg?s=2048x2048&w=is&k=20&c=_amVZ_jdxmXIVnFcCyVqU__Ic3hE26fuRQBUwVB8vKs="},


}, { timestamps: true })

module.exports = mongoose.model("Docs", docsSchema)