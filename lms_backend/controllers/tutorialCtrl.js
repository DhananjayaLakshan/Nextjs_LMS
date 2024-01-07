const Tutorial = require('../models/tutorialModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongodbID = require('../config/validateMongodbID')

const postTutorial = asyncHandler(async (req, res) => {
    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }
        if (req.body.tutorialCategory) {
            req.body.tutorialCategorySlug = slugify(req.body.tutorialCategory.toLowerCase())
        }

        const postTutorial = await Tutorial.create(req.body)
        res.status(200).json({
            status: true,
            message: "Tutorial Created Successfully!!"
        })

    } catch (error) {
        throw new Error(error)
    }
})

const getAllTutorials = asyncHandler(async (req, res) => {
    try {
        const allTutorials = await Tutorial.find()
        res.status(200).json({
            status: true,
            message: "Tutorials Fetched Successfully!!",
            allTutorials
        })
    } catch (error) {
        throw new Error(error)

    }
})

const getATutorial = asyncHandler(async (req, res) => {
    const { slug, type } = req.params

    try {
        const getAtutorial = await Tutorial.findOne({
            slug: slug,
            tutorialCategorySlug: type
        })

        const tutorialTopics =
            await Tutorial
                .find({ tutorialCategorySlug: type })
                .select("topicName title slug tutorialCategorySlug")
                .sort("createdAt")

        res.status(200).json({
            status: true,
            message: "Tutorial Fetched Successfully!!",
            getAtutorial,
            tutorialTopics
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateTutorial = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbID(id)

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }
        if (req.body.tutorialCategory) {
            req.body.tutorialCategorySlug = slugify(req.body.tutorialCategory.toLowerCase())
        }
        const updateTutorial = await Tutorial.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "Tutorial Updated Successfully!!"
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteTutorial = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbID(id)

    try {
        
        const deleteTutorial = await Tutorial.findByIdAndDelete( id )
        res.status(200).json({
            status: true,
            message: "Tutorial Deleted Successfully!!"
        })
        
    } catch (error) {
        throw new Error(error)
    }
})




module.exports = {
    postTutorial,
    getAllTutorials,
    getATutorial,
    updateTutorial,
    deleteTutorial
}