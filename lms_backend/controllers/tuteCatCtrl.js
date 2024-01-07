const tutorialCategory = require('../models/tuteCategoryModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongodbID = require('../config/validateMongodbID')

const postTutorialCategory = asyncHandler(async (req, res) => {
    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }

        const postTutCat = await tutorialCategory.create(req.body)
        res.status(200).json({
            status: true,
            message: "Tutorial Category Created Successfully!!"
        })

    } catch (error) {
        throw new Error(error)
    }
})

const getAllTuteCategory = asyncHandler(async (req, res) => {
    try {
        const allTutorial = await tutorialCategory.find()
        res.status(200).json({
            status: true,
            message: "Tutorials Category Fetched Successfully!!",
            allTutorial
        })
    } catch (error) {
        throw new Error(error)

    }
})

const getATuteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {
        const findTuteCategory = await tutorialCategory.findById(id)
        res.status(200).json({
            status: true,
            message: "Tutorial Category Fetched Successfully!!",
            findTuteCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteATuteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {
        const deleteTuteCategory = await tutorialCategory.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Tutorial Category Deleted Successfully!!",
            deleteTuteCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateATuteCategory = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }
        const updateTuteCategory = await tutorialCategory.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "Tutorial Category Updated Successfully!!",
            updateTuteCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    postTutorialCategory,
    getAllTuteCategory,
    getATuteCategory,
    deleteATuteCategory,
    updateATuteCategory
}