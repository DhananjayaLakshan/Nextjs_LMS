const DocCategory = require('../models/docCatModel')
const asyncHandler = require('express-async-handler')
const validateMongodbID = require('../config/validateMongodbID')

const postDcoCategory = asyncHandler(async (req, res) => {
    try {
        await DocCategory.create(req.body)
        res.status(200).json({
            status: true,
            message: "Document Category Created Successfully!!"
        })

    } catch (error) {
        throw new Error(error)
    }
})

const getAllDocCategory = asyncHandler(async (req, res) => {
    try {
        const docs = await DocCategory.find();
        res.status(200).json({
            status: true,
            message: "Document Category Fetched Successfully!!",
            docs
        })
    } catch (error) {
        throw new Error(error)

    }
})

const getADocCategory = asyncHandler(async (req, res) => {

    const { title } = req.params
    

    try {
        const findDocCategory = await DocCategory.findOne({title})
        res.status(200).json({
            status: true,
            message: "Document Category Fetched Successfully!!",
            findDocCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteADocCategory = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {
        const deleteDocCategory = await DocCategory.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Document Category Deleted Successfully!!",
            deleteDocCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateADocCategory = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {

        const updateDocCategory = await DocCategory.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "Document Category Updated Successfully!!",
            updateDocCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    postDcoCategory,
    getADocCategory,
    getAllDocCategory,
    deleteADocCategory,
    updateADocCategory
}