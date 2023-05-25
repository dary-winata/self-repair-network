const couch = require('../utils/dbCouch.connection')

const getDataCouch = async (url) => { 
    const db = await (await couch()).db.use(url)
    return await db.list({include_docs: true})
}

const insertDataCouch = async (url, data) => {
    const db = await (await couch()).db.use(url)
    return await db.insert(data)
}

const createDatabaseCouch = async (url) => await (await couch()).db.create(url)

const listAllDbCouch = async () => await (await couch()).db.list()

const createUsersCouch = async (data) => {
    const db = await (await couch()).db.use("_users")
    return await db.insert(data)
}

const searchDataUserCouch = async(username, password) => {
    const db = await (await couch()).db.use("customers")
    const customer = await db.list({include_docs: true})
    for(let i = 0; i < customer.total_rows; i++) {
        if(customer.rows[i].doc.username == username && customer.rows[i].doc.password == password)
            return true
    }

    return false
}

module.exports = {
    getDataCouch,
    createDatabaseCouch,
    listAllDbCouch,
    createUsersCouch,
    insertDataCouch,
    searchDataUserCouch
}