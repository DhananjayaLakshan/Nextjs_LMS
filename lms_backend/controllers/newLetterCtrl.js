const NewsLetter = require('../models/newsLetterModel')
const asyncHandler = require('express-async-handler')
const validateMongodbID = require('../config/validateMongodbID')

const subscribe = asyncHandler(async (req, res) => {
    try {
        const newEmail = await NewsLetter.create(req.body)
        res.status(200).json({
            status: true,
            message: "Subscribed To NewsLetter!!"
        })
    } catch (error) {
        throw new Error(error)
    }
})


const unsubscribe = asyncHandler(async (req, res) => {
    const {id} = req.params
    validateMongodbID(id)
    try {
        const deleteEmail = await NewsLetter.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Unsubscribed To NewsLetter!!"
        })

    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {subscribe, unsubscribe}