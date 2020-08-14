const express = require('express');
const dash = express.Router();

dash.get('/dashboard',(req,res)=>{
    res.render('student')
})

module.exports = dash;