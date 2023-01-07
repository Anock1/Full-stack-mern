const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);
const {v4:uuidv4} = require('uuid');
const port =process.env.PORT||4111;


// body parser
//BodyParsing
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret:uuidv4(),
    saveUninitialized: true,
    resave: true
  }));

app.use(passport.initialize());
app.use(passport.session());


//database connection
const mongoURI = process.env.MONGO_URL
mongoose.connect(mongoURI)
.then((res)=>{
    console.log('connected to database successfully');
})
.catch((err)=>{
    console.log('error while connecting to databse  :'+ err);
})

//loading static files
app.use(express.static('public'));

// setting view engine
app.set('view engine', 'ejs');


app.use('/', require('./routes/userRoutes'));

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})