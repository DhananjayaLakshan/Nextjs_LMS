const generateToken = require('../config/jwtToken')
const validateMongodbID = require('../config/validateMongodbID')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const crypto = require('crypto')
const sendEmail = require('./emailCtrl')

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

/******** */

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

/******** */


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


/******** */



/**Get a User */

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbID(id)

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

/******** */



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

/******** */



/**Delete a user */

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbID(id)

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

/******** */



/**Block a User */

const blockUser = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {
        const block = await User.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "User Blocked Successfully.!!"
        })
    } catch (error) {
        throw new Error(error)
    }

})

/******** */


/**Block a User */

const unblockUser = asyncHandler(async (req, res) => {

    const { id } = req.params
    validateMongodbID(id)

    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            { isBlocked: false },
            { new: true }
        )
        res.status(200).json({
            status: true,
            message: "User Unblocked Successfully.!!"
        })
    } catch (error) {
        throw new Error(error)
    }

})

/******** */


/**updatePassword */

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { password } = req.body
    validateMongodbID(_id)

    try {
        const user = await User.findById(_id)

        if (user && password && (await user.isPasswordMatched(password))) {
            throw new Error("Please provide a new password instead of old password")
        } else {
            user.password = password
            await user.save()
            res.status(200).json({
                status: true,
                message: "Password Updated Successfully.!!"
            })

        }
    } catch (error) {
        throw new Error(error)
    }
})

/************ */


/** Forgot Password token */

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error ("User Not Exists with this email")
    }

    try {
        const token = await user.createPasswordResetToken()
        await user.save()
        const resetLink = `http://localhost:4000/api/user/resetPassword/${token}`

        const data = {
            to: email,
            text: `Hey ${user.firstName + " " + user.lastName}`,
            subject: "Forgot Password",
            html: resetLink,
        }

        sendEmail(data)

        res.status(200).json(resetLink)

    } catch (error) {
        throw new Error (error)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const {password} = req.body
    const {token} = req.params
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()},
    })

    if (!user) {
        throw new Error ("Token Expired, Please try again.")
    }

    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    res.status(200).json({
        status: true,
        message: "Password Reset Successfully.!!"
    })
})



/****** */
module.exports = { 
    registerUser, 
    loginUser, 
    getAllUser, 
    updateUser, 
    deleteUser, 
    getUser, 
    blockUser, 
    unblockUser, 
    updatePassword, 
    forgotPasswordToken, 
    resetPassword 
}