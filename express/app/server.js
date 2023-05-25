const connectionCouchdb = require('./utils/dbCouch.connection')
const connectionMongo = require('./utils/dbMongo.connection')
const { connection } = require('mongoose')
const routeGeneral = require('./routes')
const { response } = require('express')
const express = require('express')
const cors = require('cors')
const port = 3000
var coucDb = false

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', routeGeneral)

try{
    connectionCouchdb().then((response) => console.log("database connected")).catch((e) => console.log(e))
    coucDb = true
    connectionMongo().then((response) => console.log("database mongo connected"))
    coucDb = false
} catch {
    if(coucDb == false)
        connectionMongo().then((response) => console.log("database mongo connected"))
}

app.listen(port, () => {
    console.log(`server is running up on port ${port}`)
})
