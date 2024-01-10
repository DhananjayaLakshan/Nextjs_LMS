const Video = require('../models/videoModel')
const validateMongodbID = require('../config/validateMongodbID')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

/**CREATE or post video */

const postVideo = asyncHandler(async (req, res) => {
    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }

        const video = await Video.create(req.body)
        res.status(200).json({
            status: true,
            message: "Video Posted Successfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**GET a video */

const getAVideo = asyncHandler(async (req, res) => {
    const { slug } = req.params

    try {
        const video = await Video.findOne({ slug: slug })
        res.status(200).json({
            status: true,
            message: "Video Fetched Successfully",
            video
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**GET all video */

const getAllVideo = asyncHandler(async (req, res) => {

    try {
        const videos = await Video.find()
        res.status(200).json({
            status: true,
            message: "Videos Fetched Successfully",
            videos
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**DELETE all video */

const deleteVideo = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await Video.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Videos Deleted Successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**UPDATE video */

const updateVideo = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbID(id)
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }
        await Video.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: true,
            message: "Videos Updated Successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */

module.exports = {
    postVideo,
    getAVideo,
    getAllVideo,
    deleteVideo,
    updateVideo
}