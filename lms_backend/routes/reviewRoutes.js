const reviewRouter = require('express').Router()
const {
    createReview,
    getAllReview,
    getAReview,
    deleteReview,
    updateReviewStatus,
} = require('../controllers/reviewCtrl')
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

reviewRouter.post('/', authMiddleware, createReview)
reviewRouter.get('/', getAllReview).get('/:id', authMiddleware, isAdmin, getAReview)
reviewRouter.put('/:id', authMiddleware, isAdmin, updateReviewStatus)
reviewRouter.delete('/:id', authMiddleware, isAdmin, deleteReview)



module.exports = reviewRouter