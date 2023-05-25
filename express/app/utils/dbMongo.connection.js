const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env
const mongoose = require('mongoose')

const connection = async () => await mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_NAME}`)

module.exports = connection
