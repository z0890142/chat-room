const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');

//port number
const port=4201;
const app=express();
app.use(cors());
const routers=require('./router/router.js');

var dirRoot = path.dirname(__dirname);
var log4js = require('./config/logconfig.js');



app.use(bodyParser.json());
app.use('/chat',routers);


log4js.use(app);
app.listen(port,() => {
    console.log('start port'+port);
});

