const newsLetterRouter = require('express').Router()
const { subscribe, unsubscribe } = require('../controllers/newLetterCtrl')

newsLetterRouter.post('/', subscribe)
newsLetterRouter.delete('/:id', unsubscribe)


module.exports = newsLetterRouter