const docRouter = require("express").Router()
const {
    postDoc,
    getADoc,
    getAllDoc,
    deleteDoc,
    updateDoc
} = require("../controllers/docCtrl")
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

docRouter.post('/', authMiddleware, isAdmin, postDoc)
docRouter.get('/', getAllDoc).get('/:slug', getADoc)
docRouter.put('/:id', authMiddleware, isAdmin, updateDoc)
docRouter.delete('/:id', deleteDoc)


module.exports = docRouter