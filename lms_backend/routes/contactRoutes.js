const contactRouter = require("express").Router()
const {
    createContact,
    getAllContact,
    getAContact,
    deleteContact,
    updateContactStatus
} = require('../controllers/contactCtrl')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

contactRouter.post('/', authMiddleware, createContact)
contactRouter.get('/', getAllContact).get('/:id', authMiddleware, isAdmin, getAContact)
contactRouter.put('/:id', authMiddleware, isAdmin, updateContactStatus)
contactRouter.delete('/:id', authMiddleware, isAdmin, deleteContact)

module.exports = contactRouter