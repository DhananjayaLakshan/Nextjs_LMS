const mongoose = require('mongoose')

const validateMongodbID = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid ) {
        throw new Error ("This Id is not valid or not found")
    }
}

module.exports  = validateMongodbID