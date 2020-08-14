const express = require('express');
const session = require('express-session');
const app = express.Router();


// db
const sdb = require('../models/student');

app.get('/',(req,res)=>{
   const reg = req.session.registration;
    res.render('fees',{
        title : 'Fees',
        condition : false,
        reg 
    });
})

app.post('/',(req,res)=>{
    const reg = req.body.reg;
    sdb.findOne({registration:reg},(err,docs)=>{
        if(!docs){
            error = 'Record not found!!';
            res.render('fees',{
                error
            });
        }else{
            res.render('fees',{
                condition : true,
                name : docs.name,
                father : docs.father,
                mother : docs.mother,
                phone : docs.phone,
                classs : docs.classs
            })
        }
    })
})

module.exports = app;