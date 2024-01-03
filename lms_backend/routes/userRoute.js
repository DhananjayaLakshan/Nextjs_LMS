const express = require('express')
const { registerUser, loginUser, getAllUser, updateUser } = require('../controllers/userCtrl')
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware')
const userRouter = express.Router()

/**all post routes */
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

/**all get routes */
userRouter.get('/allUsers', isAdmin,  getAllUser)

/**PUT update user profile */
userRouter.put('/updateUser', authMiddleware, updateUser)


module.exports = userRouter