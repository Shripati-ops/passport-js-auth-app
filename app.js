const express = require('express');
const app = express();
const config = require('./config/mongoConnection');
const collection = require('./config/mongoCollections');
app.set('view-engine', 'ejs');

async function connect(){
    return await collection.userCollection();
}


 app.use(express.urlencoded({extended:false}))
 app.use(express.json());
const indexRouter = require('./Router/index');
const authRouter = require('./Router/auth');

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.listen(3000, ()=>{
    connect();
    console.log("App Listening on Port 3000");
})