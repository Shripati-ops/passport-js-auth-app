const express = require("express");
const app = express.Router();
const collection = require('../config/mongoCollections');
app.get("/", async (req,res)=>{
   
    res.render("index.ejs",{name : "Shripati"});
})

app.get("/login", (req,res)=>{  
    res.render("login.ejs");
})

app.get('/register', (req,res) =>{
    res.render("register.ejs");
})



module.exports = app;