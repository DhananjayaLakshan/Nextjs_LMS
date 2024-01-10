const blogCatRouter = require('express').Router()
const {
    postBlogCategory,
    getABlogCategory,
    getAllBlogCategory,
    deleteABlogCategory,
    updateABlogCategory
} = require("../controllers/blogCatCtrl")
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

blogCatRouter.post("/", authMiddleware, isAdmin, postBlogCategory)
blogCatRouter.get("/all", getAllBlogCategory).get("/:title", authMiddleware, isAdmin, getABlogCategory)
blogCatRouter.put("/:id", authMiddleware, isAdmin, updateABlogCategory)
blogCatRouter.delete("/:id", authMiddleware, isAdmin, deleteABlogCategory)



module.exports = blogCatRouter