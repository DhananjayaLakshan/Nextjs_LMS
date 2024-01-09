const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
    comment: { type: String, require: true },
    color: { type: String, require: true },
    isApproved: { type: Boolean, default: false }

}, { timestamps: true })

module.exports = mongoose.model("Review", reviewSchema)