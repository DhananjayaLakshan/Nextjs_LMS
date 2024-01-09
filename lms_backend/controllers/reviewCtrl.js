const Review = require('../models/reviewModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongodbID = require('../config/validateMongodbID')


/****CREATE Review */

const createReview = asyncHandler(async (req, res) => {
    const { _id } = req.user
    validateMongodbID(_id)

    try {
        const data = {
            user: _id,
            comment: req.body.comment,
            color: req.body.color
        }
        const review = await Review.create(data)
        res.status(200).json({
            status: true,
            message: "Review Added Successfully!!"
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */

/****GET ALL Review */

const getAllReview = asyncHandler(async (req, res) => {

    try {
        const reviews = await Review.find().populate("user")//can get record with all the user info
        res.status(200).json({
            status: true,
            message: "Reviews Fetched Successfully!!",
            reviews
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */


/****GET A Review */

const getAReview = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const review = await Review.findById(id).populate("user")//can get record with all the user info
        res.status(200).json({
            status: true,
            message: "Review Fetched Successfully!!",
            review
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */

/****DELETE Review */

const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await Review.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Review Deleted Successfully!!",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */

/****UPDATE Review */

const updateReviewStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await Review.findByIdAndUpdate(
            id,
            { isApproved: req.body.isApproved },
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "Review Updated Successfully!!",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */


module.exports = {
    createReview,
    getAllReview,
    getAReview,
    deleteReview,
    updateReviewStatus
}
