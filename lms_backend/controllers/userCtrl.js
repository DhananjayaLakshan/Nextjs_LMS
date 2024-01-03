const generateToken = require('../config/jwtToken')
const validateMongodbID = require('../config/validateMongodbID')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

/**Create a User */
const registerUser = asyncHandler(async (req, res) => {
    /**Get the email from rq.body and find whether a user exists or not */
    const email = req.body.email
    /**Find the user with this email get from req.body */
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        /**create a user */
        const createUser = await User.create(req.body)
        res.status(200).json({
            status: true,
            message: "User Created Successfully",
            createUser,
        })
    } else {
        throw new Error("User Already Exists!")
    }

})

/**login a user */

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    /**check user exists or not */
    const findUser = await User.findOne({ email: email })

    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.status(200).json({
            status: true,
            message: "Login Successfully!!",
            token: generateToken(findUser?._id),
            role: findUser?.roles,
            userName: findUser?.firstName + " " + findUser?.lastName,
            user_image: findUser?.user_image
        })
    } else {
        throw new Error("Invalid Credentials")
    }

})

/**Get all users */

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const allUser = await User.find()
        res.status(200).json({
            status: true,
            message: "All Users Fetch Successfully..!!",
            allUser
        })
    } catch (error) {
        throw new Error(error)
    }
})
/**Get a User */

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getProfile = await User.findById(id)
        res.status(200).json({
            status: true,
            message: "User Found",
            getProfile
        })
    } catch (error) {
        throw new Error(error)
    }
})



/**Update a user */

const updateUser = asyncHandler(async (req, res) => {

    const { _id } = req.user
    validateMongodbID(_id)

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true })
        res.status(200).json({
            status: true,
            message: "Profile Updated Successfully..!!",
            user
        })
    } catch (error) {
        throw new Error(error)
    }
})

/**Delete a user */

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Profile Deleted Successfully..!!"
        })
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { registerUser, loginUser, getAllUser, updateUser, deleteUser, getUser }