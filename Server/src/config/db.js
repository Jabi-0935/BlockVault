const mongoose = require('mongoose');

async function connectdb(MONGO_URI){
    try{
        await mongoose.connect(MONGO_URI)
    }catch(err){
        console.error("Connection Failed with DB ",err);
        process.exit(1);
    }
}


module.exports = connectdb