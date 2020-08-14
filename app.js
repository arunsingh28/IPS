var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');
var session = require('express-session');
// var multer = require('multer');

// setup storage engine
// const storage = multer.diskStorage({
//     destination: './public/uploads',
//     filename : function(req,file,cb){
//         cb(null,file.fieldname+'-'+Data.now()+
//         path.extname(file.originalname));
//     }
// });

// init upload
// const upload = multer({
//     storage : storage
// }).single('photo');



var app = express();


//router
var studentRouter = require('./routes/student'); 
var editRouter = require('./routes/edit');
var teacherRouter = require('./routes/teacher');
var feesRouter = require('./routes/feesControl')
var userRouter = require('./routes/user');
var studentDashRouter = require('./routes/dashboard');

//body-Parser
app.use(express.urlencoded({extended:false})); 
app.use(morgan('dev'));

app.use(session({
    name : 'User-Name',
    secret : '199021-%23-auUndAXA-1292$!@-astd%$da',
    saveUninitialized : false,
    resave : false
}));

// connect to db
var url = 'mongodb://localhost:27017/IPS';
mongoose.connect(url,{ useUnifiedTopology: true , useNewUrlParser : true},(err)=>{
    if(!err){
        console.log('Connected to DB sucessfully')
    }
    else{
        console.log('Error fro Connecting to DB');
    }
});


// set view engine
app.engine('hbs', hbs({extname:'hbs', defaultLayout:'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// urls
app.use('/ips/addmission', studentRouter);
app.use('/edit',editRouter);
app.use('/ips/findTeacherSheadule',teacherRouter);
app.use('/ips/feescontrol',feesRouter);
app.use('/ips/student',studentDashRouter);
// default
app.use('/',userRouter);


// dir
app.use(express.static(path.join(__dirname,'/public')));



// server listning
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on https://localhost:${PORT}`);
})