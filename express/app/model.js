const { Schema, model } = require('mongoose')

const dataSchema = new Schema({
    _id: {
        type: String,
        default: () => " "
    }
}, {strict: false, versionKey: false})

module.exports = (collectionName) => {return model(collectionName, dataSchema)}