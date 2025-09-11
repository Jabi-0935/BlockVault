const  mongoose = require('mongoose');


const userschema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    passhash:{type:String,required:true},
    createdAt:{type: Date,default:Date.now}


})
const User = mongoose.model('user',userschema);

module.exports ={User};