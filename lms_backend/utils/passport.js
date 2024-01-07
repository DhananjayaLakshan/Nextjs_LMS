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
    async function(accessToken , refreshToken, profile, cb){
        let data = profile?._json
        const user = await User.findOne({email: data.email})

        if (user) {
            return await cb(null,user)
        }else{
            const newUser = await User.create({
                firstName: data.name,
                lastName: data.given_name,
                user_image: data.picture,
                email: data.email,
                role:"user"
            })
        }
        return await cb(null,newUser)
    }
))

passport.serializeUser((user,done) => {
    done(null,user)
})

passport.deserializeUser((user,done) => {
    done(null,user)
})

