const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Final-Assignment-Database';

const id = new ObjectID();
console.log(ObjectID);

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error,client) => {
    if(error){
        return console.log('Unable to connect to the database.');
    }
    const db = client.db(databaseName);
})
