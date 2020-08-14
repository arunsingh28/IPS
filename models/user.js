var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    name :{
        type : String,
    },
    password : {
        type : String,
    },
    email : {
        type : String,
    },
    photo : {
        type : String,
        default : 'default',
    },
    post : {
        type : String,
        default : 'Teacher'
    },
    Date : {
        type : Date,
        default : Date.now()
    },
    profit : {
        type : Number,
        default : 600
    },
    fees : {
        type : Number,
        default : 260
    },
    bill : {
        type : Number,
        default : 2000
    },
    student : {
        type : Number,
        default : 3000
    },
    uid : {
        type : String,
        required : true
    },
    sid : {
        type : Number,
        default : 000
    }
});

var user = mongoose.model('user', UserSchema);

module.exports = user;