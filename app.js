require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const  url= require('./routes/url');
const path = require('path');
const staticrouter = require('./routes/staticrouter');
const userrout = require('./routes/user')
const cookieParser = require("cookie-parser");

const { checkAuth , restricto }  = require("./middelware/auth");
const { configDotenv } = require('dotenv');

const app = express();

const PORT =  process.env.PORT || 8002


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected");
}).catch((error) => {
    console.error("DB Connection Error: ", error);
});

app.set('view engine' , 'ejs')
app.set('views' ,  path.resolve('./views'))

app.use(express.json()); 
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkAuth)

app.use('/user' , userrout)
app.use('/url', restricto(["NORMAL" , "ADMIN"]) , url)
app.use('/' ,  staticrouter)

app.listen(PORT , () => {
    console.log(`Server Started At ${PORT}`);
    
})
