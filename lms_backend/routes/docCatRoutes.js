const docCatRouter = require('express').Router()
const {
    postDcoCategory,
    getADocCategory,
    getAllDocCategory,
    deleteADocCategory,
    updateADocCategory
} = require("../controllers/docCatCtrl")
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware')

docCatRouter.post("/", authMiddleware, isAdmin, postDcoCategory)
docCatRouter.get("/all", getAllDocCategory).get("/:title", authMiddleware, isAdmin, getADocCategory)
docCatRouter.put("/:id", authMiddleware, isAdmin, updateADocCategory)
docCatRouter.delete("/:id", authMiddleware, isAdmin, deleteADocCategory)



module.exports = docCatRouter