const Model = require('../model')
const mongoose = require('mongoose')
const dbMongo = require('../utils/dbMongo.connection')

const getDataMongoCtrl = async(url) => await Model(url).find()

const insertDataMongoCtrl = async(url, data) => await Model(url).create(data)

const deleteDataMongoCtrl = async(url) => await Model(url).deleteMany({})

const getCollectionMongoCtrl = async() => {
    var value = []
    var db = await dbMongo()

    return db.connection.db.listCollections().forEach((hasil) => {
        value.push(hasil.name)
    }).then((respoonse) => value)
}

const getUserCollectionMongoCtrl = async(username) => {
    return await Model("customers").findOne({"username" : {$regex : username}})
}

module.exports = {
    getDataMongoCtrl,
    insertDataMongoCtrl,
    deleteDataMongoCtrl,
    getCollectionMongoCtrl,
    getUserCollectionMongoCtrl
}