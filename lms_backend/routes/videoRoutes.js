const videoRouter = require("express").Router()
const {
    postVideo,
    getAVideo,
    getAllVideo,
    deleteVideo,
    updateVideo
} = require("../controllers/videoCtrl")
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

videoRouter.post('/', authMiddleware, isAdmin, postVideo)
videoRouter.get('/', getAllVideo).get('/:slug', authMiddleware, isAdmin, getAVideo)
videoRouter.put('/:id', authMiddleware, isAdmin, updateVideo)
videoRouter.delete('/:id', authMiddleware, isAdmin, deleteVideo)


module.exports = videoRouter