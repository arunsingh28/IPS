const express = require('express');
const nodemailer = require('nodemailer');
const session = require('express-session');
const student = express.Router();

// brign database
const sdb = require('../models/student');


let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        user: 'indianpublicschool.ipic@gmail.com',
        pass : '#Apple1397'
    }
});


// for displaying add-page
student.get('/',(req,res)=>{
    res.statusCode = 200;
    res.render('add_addmission')
});


student.post('/',(req,res)=>{
    const {name,father,mother,classs,phone,religion,dob,category,section,address,adhar,registration,email} = req.body;
    sdb.findOne({registration:registration},(err,docs)=>{
        if(!docs){
            let mailOptions = {
                from : 'indianpublicschool.ipic@gmail.com',
                to : email,
                subject : 'Your Addmission Process is done',
                html : '<h1 style="color:#20374a">Hello '+name+'</h1><br><h2>Your Addmission is done in class '+classs+'</h2><h2 style="color:#20374a">Your Registration Number: '+ registration +'</h2><br><h3>Your login id is same as you Registrion Number:'+registration+'</h3><h3>Your login password:<mark>'+registration+'</mark></h3><br><br><p>You can use this account for view timetable and marks or ohter purpose.</p><p><strong>You can change this password by going to <br>Important links > Reset Login Detail</strong></p><a href="http://localhost:5000/"><button style="padding:4px 25px 4px 25px; color:#fff ; border:none; background-color:#3a6cdc;font-family: sans-serif ;border-radius:10px">Login</button></a><p><strong>Thank You <br>From Indian Public Inter College(IT Department),Aligarh</strong>',
            };

            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('Email is Send:'+info.response);
                    const newStudent = new sdb({name,father,mother,classs,phone,religion,dob,category,section,address,adhar,registration,email});
                    newStudent.save();
                    req.session.registration = registration;
                    res.redirect('/ips/feescontrol');
                }
            });
        }else{
            err = 'Adhar number is match with other student';
            res.render('add_addmission',{
                title : 'Student',
                err
            })
        }
    })
});

student.get('/edit',(req,res)=>{
    res.statusCode = 200;
    res.render('edit_addmi');
});

student.post('/edit',(req,res)=>{
    const name = req.body.name;
    sdb.findOne({registration:name},(err,docs)=>{
        if(!docs){
            err = 'No Record Found 🤖';
            res.render('edit_addmi',{
                msg : err
            })
        }
        else{
        res.render('edit_addmi',{
            name:docs.name,
            registration: docs.registration,
            father:docs.father,
            mother:docs.mother,
            classs:docs.classs,
            phone:docs.phone,
            religion:docs.religion,
            adhar:docs.adhar,
            dob:docs.dob,
            category:docs.category,
            section:docs.section,
            address:docs.address,
            photo:docs.photo,
            condition:true
        })
    }
    })
});

student.get('/delete',(req,res)=>{
    res.render('delete');
})


student.post('/delete',(req,res)=>{
    var reg = req.body.reg;
    sdb.findOne({registration:reg},(err,docs)=>{
        if(!docs){
            res.render('delete',{
                condition : true,
                reg : reg
            })
        }else{
            console.log(docs);
            res.render('delete',{
                name:docs.name,
                registration: docs.registration,
                father:docs.father,
                mother:docs.mother,
                classs:docs.classs,
                phone:docs.phone,
                religion:docs.religion,
                adhar:docs.adhar,
                dob:docs.dob,
                category:docs.category,
                section:docs.section,
                address:docs.address,
                photo:docs.photo,
                conditionn : true
            })
        }
    })
})

student.post('/delete/student',(req,res)=>{
  const reg = req.body.reg;
  sdb.findOne({registration:reg},(err,docs)=>{
      if(!docs){
          res.redirect('/delete')
      }else{
          docs.remove(docs=>{
            res.redirect('/dashboard');
          })
      }
  })
})

module.exports = student;