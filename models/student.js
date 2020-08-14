var mongoose = require('mongoose');

var student = new mongoose.Schema({
    name : {
        type : String,
    },
    father : {
          type: String, 
    },
    mother : {
        type : String,
    },
    classs : {
        type : String,
    },
    phone : {
        type : Number,
    },
    religion : {
        type : String,
    },
    adhar : {
        type : String,
    },
    category :{
        type : String,
    },
    section : {
        type : String,
    },
    address : {
        type : String,
    },
    date_of_addmission: {
        type: Date,
        default: Date.now
    },
    registration :{
        type : String
    },
    dob :{
          type : Date
      },
    photo:{
        type : String
    },
    email : {
        type : String,
        default : 'arun.singh28aug.as@gmail.com'
    }
});
const students = mongoose.model('student', student);

module.exports = students;

