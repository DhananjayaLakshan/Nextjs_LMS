const tutCatRouter = require('express').Router()
const {
    postTutorialCategory,
    getAllTuteCategory,
    getATuteCategory,
    deleteATuteCategory,
    updateATuteCategory
} = require("../controllers/tuteCatCtrl")
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

tutCatRouter.post("/", authMiddleware, isAdmin, postTutorialCategory)
tutCatRouter.get("/", getAllTuteCategory)
tutCatRouter.get("/:id", authMiddleware, isAdmin, getATuteCategory)
tutCatRouter.put("/:id", authMiddleware, isAdmin, updateATuteCategory)
tutCatRouter.delete("/:id", authMiddleware, isAdmin, deleteATuteCategory)



module.exports = tutCatRouter