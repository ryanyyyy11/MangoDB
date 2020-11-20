import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './routes/auth.js'
import updateRouter from './routes/update.js'
import path from 'path'
//import morgan from 'morgan'
//import data from './data'
//import unirest from 'unirest'

//import * as postRoute from './routes/posts.js'
const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

//Testing unirest
/*var req = unirest("GET", "https://feeditem-lowes.p.rapidapi.com/itemID/%7Bid%7D");

req.headers({
	"x-rapidapi-host": "feeditem-lowes.p.rapidapi.com",
	"x-rapidapi-key": "3e651d58f0msh67c164282239e90p10d06bjsnb7e14a77f594",
	"useQueryString": true
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);
	console.log(res.body);
});*/

//Connect to DB
mongoose.connect(
     process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    () => console.log('connected to DB!')
);

//Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

const dir = path.resolve(path.dirname(''));

console.log(dir);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(dir,'Client', 'build','index.html'));
    })
}

app.use(bodyParser.json());

//Route Middlewares
app.use('/', router);
app.use('/', updateRouter);

app.listen(PORT, () => console.log('Server Up and Running'));
