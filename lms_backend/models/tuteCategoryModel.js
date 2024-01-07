const mongoose = require('mongoose')

let tuteCategorySchema = mongoose.Schema({
    title: { type: String, require: true, unique: true },
    slug: { type: String, require: true, unique: true, index: true },
    image: { type: String, default: "https://media.istockphoto.com/id/1454186568/vector/photo-coming-soon-no-photo-symbol-no-thumbnail-available-default-thumbnail-available-photo.jpg?s=2048x2048&w=is&k=20&c=_amVZ_jdxmXIVnFcCyVqU__Ic3hE26fuRQBUwVB8vKs=" },


}, { timestamps: true })

module.exports = mongoose.model("tutorialCategory", tuteCategorySchema)