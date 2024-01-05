const express = require('express')
const { registerUser, loginUser, getAllUser, updateUser, deleteUser, getUser, blockUser, unblockUser } = require('../controllers/userCtrl')
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware')
const userRouter = express.Router()

/**all POST routes */
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

/**all GET routes */
userRouter.get('/allUsers', isAdmin,  getAllUser)
userRouter.get('/getUser/:id', authMiddleware, getUser)

/**all PUT routes */
userRouter.put('/updateUser', authMiddleware, updateUser)
userRouter.put('/block/:id', authMiddleware, isAdmin, blockUser)
userRouter.put('/unblock/:id', authMiddleware, isAdmin, unblockUser)


/**all DELETE routes */
userRouter.delete('/deleteUser/:id', authMiddleware, isAdmin, deleteUser)


module.exports = userRouter