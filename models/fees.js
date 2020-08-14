const mongoose = require('mongoose');

const fee = mongoose.Schema({
    jan : {
        type : String
    },
    feb : {
        type : String
    },
    march : {
        type : String
    },
    april : {
        type : String
    },
    may : {
        type : String
    },
    june : {
        type : String
    },
    july : {
        type : String
    },
    aug : {
        type : String
    },
    sept : {
        type : String
    },
    oct : {
        type : String
    },
    nov : {
        type : String
    },
    dev : {
        type : String
    },
    
});

const fees = mongoose.model('fees',fee);

module.exports = fees;
