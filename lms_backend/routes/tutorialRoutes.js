const tutorialRouter = require("express").Router()
const {
    postTutorial,
    getATutorial,
    updateTutorial,
    getAllTutorials,
    deleteTutorial
} = require("../controllers/tutorialCtrl")
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

tutorialRouter.post('/', authMiddleware, isAdmin, postTutorial)
tutorialRouter.get('/:type/:slug', getATutorial)
tutorialRouter.get('/', authMiddleware, isAdmin, getAllTutorials)
tutorialRouter.put('/:id', authMiddleware, isAdmin, updateTutorial)
tutorialRouter.delete('/:id', authMiddleware, isAdmin, deleteTutorial)


module.exports = tutorialRouter