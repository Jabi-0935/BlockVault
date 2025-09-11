const mongoose = require('mongoose');

const assetschema = new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    cryptoname:{type:String,required:true},
    buyprice:{type:Number,required:true},
    amt:{type:Number,required:true},
    date:{type:Date,default:Date.now}
})


const Asset = mongoose.model('asset',assetschema);

module.exports = {Asset};