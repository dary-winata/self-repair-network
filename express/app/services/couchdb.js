const { getDataCouch, createDatabaseCouch, listAllDbCouch, createUsersCouch, insertDataCouch, searchDataUserCouch} = require('../controller/couchdb')
const { getAllCollectionMongoSrvc, getDataMongoSrvc } = require('./mongodb')

const getCouchDataSrvc = async(url) => await getDataCouch(url)

const createDatabaseSrvc = async(url) => await createDatabaseCouch(url)

const listAllDbsSrvc = async() => await listAllDbCouch()

const createUserCouchSrvc = async(data) => {
    await createUsersCouch(data)
}

const insertDataCouchSrvc = async(url, data) => {
    const listDb = await listAllDbCouch()
    console.log(listDb)
    console.log(url)
    if(!listDb.includes(url)) {
        createDatabaseCouch(url)
    }
    insertDataCouch(url, data).catch((e) => console.log(""))
}

const syncDatabaseCouch = async() => {
    const mongoCollection = await getAllCollectionMongoSrvc()
    for(let i = 0; i < mongoCollection.length; i++) {
        var data = await getDataMongoSrvc(mongoCollection[i])
        data.forEach(async (value) => {
            insertDataCouchSrvc(mongoCollection[i], value)
        })
    }

    return data
}

const loginDatabaseCouch = async(username, password) => {
    return await searchDataUserCouch(username, password)
}

const registerDatabaseCouch = async(username, password, email) => {
    const user = {
        "username" : username,
        "password" : password,
        "email" : email
    }

    return await insertDataCouchSrvc("customers", user)
}

module.exports = {
    getCouchDataSrvc,
    createDatabaseSrvc,
    listAllDbsSrvc,
    createUserCouchSrvc,
    insertDataCouchSrvc,
    syncDatabaseCouch,
    loginDatabaseCouch,
    registerDatabaseCouch
}