const express = require('express'); 
const bodyParser = require('body-parser');
const app = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.render('teacher_time',{
        title: 'Find Teacher :get',
    });
});

app.post('/',(req,res)=>{
    var uid = req.body.uid;
   if(uid == 1){
       res.render('teacher_time',{
           uid : 1,
           title : 'Find Teacher',
           name : 'I.P. Singh',
           msg : 'You Dont have Time Table',
           subject : '[English ]'
       })
   }
   else if(uid == 2){
    res.render('teacher_time',{
        uid : 2,
        title : 'Find Teacher',
        name : 'Shyam lal',
        msg : 'You Dont have Time Table',
        subject : '[dontknow]'
    })
   }
   else if(uid == 3){
    res.render('teacher_time',{
        uid : 3,
        title : 'Find Teacher',
        name : 'Mahesh Singh',
        empl : true,
        time_table : '../images/timetable/sample_timetable.png',
        subject : '[Maths + Hindi + Drawing]'
    })
    }
else if(uid == 4){
    res.render('teacher_time',{
        uid : 4,
        title : 'Find Teacher',
        name : 'Anjali Singh',
        empl : true,
        time_table : '../images/timetable/sample_timetable1.png',
        subject : '[Hindi + Sanskrit]'
    })    
}
else if(uid == 5){
    res.render('teacher_time',{
        uid : 5,
        title : 'Find Teacher',
        name : 'Malti Sharma',
        empl : true,
        time_table : '../images/timetable/sample_timetable.png',
        subject : '[Maths + English]'
    })   
}
else if(uid == 6){
    res.render('teacher_time',{
        uid : 6,
        title : 'Find Teacher',
        name : 'RajKumar ',
        empl : true,
        time_table : '../images/timetable/sample_timetable1.png',
        subject : '[dontkonw]'
    })   
}
else if(uid == 7){
    res.render('teacher_time',{
        uid : 7,
        title : 'Find Teacher',
        name : 'Anita Sharma',
        empl : true,
        time_table : '../images/timetable/sample_timetable1.png',
        subject : '[Matsh + Hindi]'
    })    
}
else{
    res.render('teacher_time',{
        title: 'Find Teacher',
        name : 'Not Registerd',
        uid : 'Not Found',
        empl : false,
        msg : 'Your Time Table is not Prepare.',
        subject : '[ No data avilable ]'
    })
}
    
   
})

module.exports = app;