const MongoClient = require('mongodb').MongoClient;

let client = null;
let db = null;

const connect = async () => {
    client = await MongoClient.connect('mongodb://localhost:27017');
    db = client.db('shop');
};

const disconnect = () => {
    client.disconnect();
};


module.exports = {
    connect,
    disconnect,
    getDB:() => db
};