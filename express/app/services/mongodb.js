const { getDataMongoCtrl, insertDataMongoCtrl, deleteDataMongoCtrl, getCollectionMongoCtrl, getUserCollectionMongoCtrl } = require('../controller/mongodb')
const { response } = require('express')

const getDataMongoSrvc = async(url) => await getDataMongoCtrl(url)

const insertDataMongoSrvc = async(url, data) => await insertDataMongoCtrl(url, data)

const getAllCollectionMongoSrvc = async() => await getCollectionMongoCtrl()

const createCollectionMongoSrvc = async(url) => {
    await insertDataMongoCtrl(url, undefined)
    await deleteDataMongoCtrl(url)
}

const loginCustomerMongoSrvc = async(username, password) => {
    const user = await getUserCollectionMongoCtrl(username)
    if(password == user.password) {
        return true
    }

    return false
}

const registerCustomerMongoSrvc = async(username, password, email) => {
    const data = {
        "username" : username,
        "password" : password,
        "email" : email
    }

    await insertDataMongoCtrl("customers", data)
}

module.exports = {
    getAllCollectionMongoSrvc,
    createCollectionMongoSrvc,
    insertDataMongoSrvc,
    getDataMongoSrvc,
    loginCustomerMongoSrvc,
    registerCustomerMongoSrvc
}