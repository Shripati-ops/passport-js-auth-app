const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const collection = require('../config/mongoCollections');
function initialize(passport, getUserById) {
    const authenticateUser = async(email, password, done) => {
        const readData = await collection.userCollection();
        const user = await readData.findOne({"email" : email});
        console.log(user);
        if (user == null) {
            return done(null, false, { message: "No user with that email" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id,done) => {
        const readData = await collection.userCollection();
        const user = await readData.findOne({"_id" : id});
        return done(null, user);
    });
}

module.exports = initialize;