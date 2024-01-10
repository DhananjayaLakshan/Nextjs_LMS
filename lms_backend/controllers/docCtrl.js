const Doc = require('../models/documentationModel')
const validateMongodbID = require('../config/validateMongodbID')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

/**CREATE or post Doc */

const postDoc = asyncHandler(async (req, res) => {
    try {

        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }

        const doc = await Doc.create(req.body)
        res.status(200).json({
            status: true,
            message: "Document Posted Successfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**GET a Doc */

const getADoc = asyncHandler(async (req, res) => {
    const { slug } = req.params

    try {
        const doc = await Doc.findOne({ slug: slug })
        res.status(200).json({
            status: true,
            message: "Document Fetched Successfully",
            doc
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**GET all Doc */

const getAllDoc = asyncHandler(async (req, res) => {

    try {
        const docs = await Doc.find()
        res.status(200).json({
            status: true,
            message: "Document Fetched Successfully",
            docs
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**DELETE all Doc */

const deleteDoc = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await Doc.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Document Deleted Successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */


/**UPDATE Doc */

const updateDoc = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbID(id)
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title.toLowerCase())
        }
        await Doc.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: true,
            message: "Docs Updated Successfully",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********* */

module.exports = {
    postDoc,
    getADoc,
    getAllDoc,
    deleteDoc,
    updateDoc
}