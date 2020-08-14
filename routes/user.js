var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
const nodemailer = require('nodemailer');
var user = express.Router();



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



// export model 
var userdb = require('../models/user'); 
var studentdb = require('../models/student');


user.get('/', (req,res)=>{
    res.render('user',{ title : 'Login',condition : true
    });
})

user.post('/', (req,res)=>{
    const {email , password } = req.body;
    userdb.findOne({email : email},(err,docs)=>{
        if(docs){
            var Pass = docs.password;
                if(password == Pass){
                    req.session.email = email;
                    res.redirect('/dashboard');
                }else{
                    error_2 = 'Incorrect Password';
                    res.render('user',{
                        msg : error_2,
                        title : 'Login',
                        condition : true,
                        email : email
                    })
                }
        }else{
            error_3 = 'Email is not Registerd ';
            res.render('user',{ msg : error_3,title : 'Login' , condition : true})
        }
    });

});



// dashboard
user.get('/dashboard',(req,res)=>{
    const email = req.session.email;
    userdb.findOne({email : email},(err,docs)=>{
    if(!docs){
        res.redirect('/');
    }
    else{
        studentdb.countDocuments((err,count)=>{
            res.sendStatus = 200;
            res.render('index',{
                name : docs.name,
                post : docs.post,
                photo : docs.photo,
                profit : docs.profit,
                fees : docs.fees,
                bill : docs.bill,
                seat : count,
                student : count,
                uid : docs.uid,
                title:'Dashboard'
            })
        })
    }
    })  
})

// for forgot passpord
user.get('/forgotUserPassword',(req,res)=>{
    const email = req.session.email;
   res.render('forgotpassword',{
       title : 'Reset Password',
       condition : false,
       email : email
   });
})

user.post('/forgotUserPassword/:id',(req,res)=>{
    const id = req.params.id;
    userdb.findOne({email : id},(err,docs)=>{
        if(!docs){
            err = 'Not Record Found :'+id;
            res.send(err);
        }else{
            userdb.updateOne({ email : id },
                {
                    $set : { 
                        password : req.body.password,
                    }
                }).exec()
                .then(result =>{
                    res.redirect('/')
                })
                .catch((err => console.log(err)));
        }
    })
    });



//  new user templte
user.get('/newUser',(req,res)=>{
    res.render('newuser',{title : 'NewUser'});
})

// save to db
user.post('/newUser',(req,res)=>{
    const { email,password,name,post,uid} = req.body;
   
    const newuser = new userdb({email,password,name,post,uid});
    console.log(newuser);
    // check if detail already present
    userdb.findOne({email:email}).then(user =>{
        if(user){
            var error_1 = 'Email Already present in DataBase';
            res.render('newuser',{
                error_1,
                title : 'Add User',
                color : 'background-color:#ff7b7bba', 
            })
        }else{
            let mailOptions = {
                from : 'indianpublicschool.ipic@gmail.com',
                to : email,
                subject : 'Your Account Created',
                html : '<h1 style="color:#20374a">Hello '+name+'</h1><br><h2 style="color:#20374a">Appoint as: '+ post +'</h2><br><p>Your uid is <mark>'+uid+'</mark></p><br><h3>Your login password:<mark>'+password+'</mark></h3><br><h3>Email:<strong><mark>' + email +'</mark></strong></h3> <br><p><strong>You can change this password by going to <br>Important links > Reset Login Detail</strong></p><a href="http://localhost:5000/"><button style="padding:4px 25px 4px 25px; color:#fff ; border:none; background-color:#3a6cdc;font-family: sans-serif ;border-radius:10px">Login</button></a><p><strong>Thank You <br>From Indian Public Inter College(IT Department),Aligarh</strong>',
            };

            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('Email is Send:'+info.response);
                }
            });
            var msg = 'New Record is Created.'
            newuser.save();
        //     res.render('user',{msg,
        //     color :'background-color:#a8f1a0',
        //     title : 'Login'
        //  })
        res.redirect('/dashboard')
        }
    })
    .catch((err => console.log(err)));
})



module.exports= user;