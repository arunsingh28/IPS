const express = require('express');
const session = require('express-session');
const edit = express.Router();

const Udb = require('../models/user');

edit.get('/reset/ips-dashboard/information/u/2Y21',(req,res)=>{
    res.render('edit',{
        title : 'Verify'
    })
})

edit.post('/verify',(req,res)=>{
    var email = req.body.email;
    var sid = req.body.sid;
    console.log(email,sid);
    Udb.findOne({email:email},(err,docs)=>{
        if(!docs){
            error = 'You are not Authorise for this task';
            res.render('edit',{
                error,title:'Verify'
            })
        }else{
            if(docs.sid == sid){
                req.session.email = email;
                res.redirect('/edit/youself/config/u/2Y21');
            }else{
                error_1 = 'You SID is not correct !!'
                res.render('edit',{
                    title : 'Varify',
                    error_1
                })
            }
        }
    });
});

edit.get('/youself/config/u/2Y21',(req,res)=>{
    res.render('edit_info',{
        title : 'Edit_info'
    })
})

edit.post('/varify/ok/u',(req,res)=>{
    const email = req.session.email;
    const{ profit, fees, bill,student} = req.body;
    const newDetail = Udb.update({ email : email },
        {
            $set : { profit : profit , fees : fees, bill : bill ,student : student }
        })
        .exec()
        .then(result =>{
            res.redirect('/dashboard');
        })
        .catch((err=>console.log(err)));
})
module.exports = edit;