const Contact = require('../models/contactModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const validateMongodbID = require('../config/validateMongodbID')


/****CREATE Contact */

const createContact = asyncHandler(async (req, res) => {
    

    try {
        
        const contact = await Contact.create(req.body)
        res.status(200).json({
            status: true,
            message: "Enquiry Form Submitted Successfully!!"
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */

/****GET ALL Contact */

const getAllContact = asyncHandler(async (req, res) => {

    try {
        const contacts = await Contact.find()
        res.status(200).json({
            status: true,
            message: "Enquiry Fetched Successfully!!",
            contacts
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */


/****GET A contact */

const getAContact = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const contact = await Contact.findById(id)
        res.status(200).json({
            status: true,
            message: "Enquiry Fetched Successfully!!",
            contact
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */

/****DELETE Contact */

const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await Contact.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Enquiry Deleted Successfully!!",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */

/****UPDATE Contact */

const updateContactStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        await Contact.findByIdAndUpdate(
            id,
            { status: req.body.status },
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "Enquiry Updated Successfully!!",
        })
    } catch (error) {
        throw new Error(error)
    }
})

/********** */


module.exports = {
    createContact,
    getAllContact,
    getAContact,
    deleteContact,
    updateContactStatus
}
