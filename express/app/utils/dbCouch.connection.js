const nano = require('nano')('http://couchdb:5984')

const nanoReturn = async () => {
    return await nano
}

module.exports = nanoReturn
