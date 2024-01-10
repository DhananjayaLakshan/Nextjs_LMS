const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({

    title: { type: String, required: true },
    slug: { type: String, required: true },
    thumbnail: { type: String, default: "https://media.istockphoto.com/id/1454186568/vector/photo-coming-soon-no-photo-symbol-no-thumbnail-available-default-thumbnail-available-photo.jpg?s=2048x2048&w=is&k=20&c=_amVZ_jdxmXIVnFcCyVqU__Ic3hE26fuRQBUwVB8vKs=" },
    description: { type: String, required: true },
    video_url: { type: String, required: true },
    keywords: { type: [], required: true },

}, { timestamps: true })

module.exports = mongoose.model("Video", videoSchema)