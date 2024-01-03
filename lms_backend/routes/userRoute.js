const express = require('express')
const { registerUser, loginUser, getAllUser, updateUser, deleteUser } = require('../controllers/userCtrl')
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware')
const userRouter = express.Router()

/**all POST routes */
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

/**all GET routes */
userRouter.get('/allUsers', isAdmin,  getAllUser)

/**all PUT routes */
userRouter.put('/updateUser', authMiddleware, updateUser)

/**all DELETE routes */
userRouter.delete('/deleteUser/:id', authMiddleware, isAdmin, deleteUser)


module.exports = userRouter