const express = require("express");
const app = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const collection = require('../config/mongoCollections');
const initializePassport = require("../config/passport");
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
initializePassport(
    passport,
    (id) => user.id === id
);

app.post("/login",   passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
}),async (req,res)=>{

  
})

app.post("/register", async (req,res) =>{
    
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    
    const user = {"email" : req.body.email, "password" : hashedPassword};
    const insertData = await collection.userCollection();
    const insertedData = await insertData.insertOne(user);

    res.send("User created Successfully");
})

app.get('/logout', function(req, res, next){
    req.session.destroy(function (err) {
        res.redirect('/login'); //Inside a callback… bulletproof!
      });
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("This not");
    res.redirect("/auth/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/auth/");
    }
    next();
}

module.exports = app;