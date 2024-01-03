const express = require('express')
const { registerUser, loginUser, getAllUser } = require('../controllers/userCtrl')
const userRouter = express.Router()

/**all post routes */
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

/**all get routes */
userRouter.get('/allUsers', getAllUser)

module.exports = userRouter