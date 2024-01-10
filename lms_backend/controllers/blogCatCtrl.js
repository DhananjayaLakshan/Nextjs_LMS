const BlogCategory = require('../models/blogCatModel')
const asyncHandler = require('express-async-handler')
const validateMongodbID = require('../config/validateMongodbID')

const postBlogCategory = asyncHandler(async (req, res) => {
    try {
        await BlogCategory.create(req.body)
        res.status(200).json({
            status: true,
            message: "Blog Category Created Successfully!!"
        })

    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogCategory = asyncHandler(async (req, res) => {
    try {
        const blogs = await BlogCategory.find();
        res.status(200).json({
            status: true,
            message: "Blog Category Fetched Successfully!!",
            blogs
        })
    } catch (error) {
        throw new Error(error)

    }
})

const getABlogCategory = asyncHandler(async (req, res) => {

    const { title } = req.params   

    try {
        const findBlogCategory = await BlogCategory.findOne({title})
        res.status(200).json({
            status: true,
            message: "Blog Category Fetched Successfully!!",
            findBlogCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteABlogCategory = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {
        const deleteBlogCategory = await BlogCategory.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Blog Category Deleted Successfully!!",
            deleteBlogCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

const updateABlogCategory = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {

        const updateBlogCategory = await BlogCategory.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "Blog Category Updated Successfully!!",
            updateBlogCategory
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = {
    postBlogCategory,
    getABlogCategory,
    getAllBlogCategory,
    deleteABlogCategory,
    updateABlogCategory
}