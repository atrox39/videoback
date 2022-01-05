const {url} = require('./config.json');
const mongoose = require('mongoose');

// Mongo
mongoose.connect(url);

const connection = mongoose.connection;

connection.on('open', ()=>{
    console.log("Database is now open");
});

connection.on('error', (error)=>{
    if(error) throw error;
});

module.exports = connection;