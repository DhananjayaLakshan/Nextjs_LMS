const googleRouter = require("express").Router()
const passport = require('passport')
const { generateToken } = require('../config/jwtToken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { json } = require("body-parser")

googleRouter.get("/login/success", asyncHandler(async (req, res) => {
    console.log("success");
    res.status(200).json({
        status: true,
        message: "Login success"
    })

}))

googleRouter.get("/login/failed", asyncHandler(async (req, res) => {
    res.status(401).json({
        status: false,
        message: "Login failed"
    })
}))

googleRouter.get("/google", passport.authenticate("google", ["profile", "email"]));


// Handle the callback after Google has authenticated the user
googleRouter.get("/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/login/success",
        failureRedirect: "/login/failed",
    })
)

googleRouter.get("/logout", asyncHandler(async (req, res) => {
    req.logout()
    res.redirect("/")
}))

module.exports = googleRouter
