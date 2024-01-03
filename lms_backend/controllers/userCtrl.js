const generateToken = require('../config/jwtToken')
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
            message:"Login Successfully!!",
            token:generateToken(findUser?._id),
            role:findUser?.roles,
            userName: findUser?.firstName + findUser?.lastName,
            user_image: findUser?.user_image
        })
    }else{
        throw new Error ("Invalid Credentials")
    }

})



module.exports = { registerUser, loginUser }