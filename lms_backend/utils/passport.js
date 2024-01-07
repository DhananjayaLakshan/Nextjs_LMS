const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require('passport')
const User = require('../models/userModel')

passport.use(new GoogleStrategy(
    {
        clientID:"983046816191-oe334j4k16v8k0gubilbbsrgfj1dcqg5.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"/auth/google/callback",
        scope:["profile","email"],
    },
    function(accessToken , refreshToken, profile, cb){
        return cb(null,profile)
    }
))

passport.serializeUser((user,done) => {
    done(null,user)
})

passport.deserializeUser((user,done) => {
    done(null,user)
})

