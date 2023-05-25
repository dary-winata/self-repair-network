const { getCouchDataSrvc, createDatabaseSrvc, listAllDbsSrvc, createUserCouchSrvc, insertDataCouchSrvc, syncDatabaseCouch, loginDatabaseCouch, registerDatabaseCouch } = require('./services/couchdb')
const { getDataMongoSrvc, insertDataMongoSrvc, createCollectionMongoSrvc, getAllCollectionMongoSrvc, loginCustomerMongoSrvc, registerCustomerMongoSrvc } = require('./services/mongodb')
const express = require('express')
const Model = require('./model')
const route = express.Router()

var couchDb = false

// couchdb
route.get('/:dbName/_all_docs', async(req, res) => {
    const url = req.params.dbName.substring(0)
    try {
        await getCouchDataSrvc(url).then((response) => { 
            res.status(200).json(response)
        })
    } catch {
        await getDataMongoSrvc(req.params.dbName).then((response) => res.status(200).json({
            "total_rows" : response.length,
            "rows" : response
        }))
    }

})

route.get('/_all_dbs', async(req, res) => {
    try {
        await listAllDbsSrvc().then((response) => res.status(200).json(response))
    } catch {
        await getAllCollectionMongoSrvc().then((response) => res.status(200).json(response))
    }
})

route.put('/:dbName', async(req, res) => {
    const url = req.params.dbName.substring(0)
    try {
        await createDatabaseSrvc(url).then((response) => res.status(200).json({ message: "Database Created" }))
        couchDb = true
        await createCollectionMongoSrvc(url).then((response) => res.status(200).json({ message: "Database Created" }))
        couchDb = false
    } catch {
        if(couchDb == false)
            await createCollectionMongoSrvc(url).then((response) => res.status(200).json({ message: "Database Created" }))

        couchDb = false
    }
})

route.put('/_users/org.couchdb.user::paramUser', async (req, res) => {
    const id = req.params.paramUser
    var data = req.body

    data["_id"] = "org.couchdb.user:" + id

    try{
        await createUserCouchSrvc(data).then((response) => { 
            res.status(200).json("user already inputed")
        }).catch((e) => console.log(e))
        couchDb = true
        await insertDataMongoSrvc("_users", data).then((reponse) => res.status(200).json("user already inputed")).catch((e) => console.log(e))
        couchDb = false
    } catch {
        if(couchDb==false)
            await insertDataMongoSrvc("_users", data).then((reponse) => res.status(200).json("user already inputed")).catch((e) => console.log(e))
        
        couchDb = false
    }
})

route.get('/recycle', async (req, res) => {
    await syncDatabaseCouch().then((resp) => res.status(200).json("already sync"))
})

route.put('/:dbName/:dbId', async (req, res) => {
    const id = req.params.dbId.replaceAll('"', '')
    var data = req.body

    data["_id"] = id

    try{
        await insertDataCouchSrvc(req.params.dbName, data).then((response) => { 
            res.status(200).json("data already inputed")
        }).catch((e) => console.log(e))
        couchDb = true
        await insertDataMongoSrvc(req.params.dbName, data).then((reponse) => res.status(200).json("data already inputed")).catch((e) => console.log(e))
        couchDb = false
    } catch {
        if(couchDb==false)
            await insertDataMongoSrvc(req.params.dbName, data).then((reponse) => res.status(200).json("data already inputed")).catch((e) => console.log(e))
        
        couchDb = false
    }
})

route.post('/v1/user/login', async (req, res) => {
    const user = req.body

    try {
        const value = await loginDatabaseCouch(user.username, user.password)
        if(value)
            res.status(200).json({
                "status" : 200,
                "message" : "login success",
                "data" : true
            })
        else
            res.status(400).json({
                "status" : 400,
                "message" : "credential wrong",
                "data" : false
            })
    } catch (e) {
        const value = await loginCustomerMongoSrvc(user.username, user.password)
        if(value)
            res.status(200).json({
                "status" : 200,
                "message" : "login success",
                "data" : true
            })
        else
            res.status(400).json({
                "status" : 400,
                "message" : "credential wrong",
                "data" : false
            })
    }
})

route.post('/v1/user/register', async (req, res) => {
    const user = req.body

    try {
        await registerDatabaseCouch(user.username, user.password, user.email).then((response) => {
            res.status(200).json({
                "status" : 200,
                "message" : "user already created",
                "data" : true
            })
        })
        
        await registerCustomerMongoSrvc(user.username, user.password, user.email).then((response) => {
            res.status(200).json({
                "status" : 200,
                "message" : "user already created",
                "data" : true
            })
        })
    } catch {
        await registerCustomerMongoSrvc(user.username, user.password, user.email).then((response) => {
            res.status(200).json({
                "status" : 200,
                "message" : "user already created",
                "data" : true
            })
        })
    }
})

module.exports = route