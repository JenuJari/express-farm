const User = require("./../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment");
var jwt = require('jsonwebtoken');

const cryptPassword = password => {
    return new Promise((res, rej) => {
        bcrypt.genSalt(10, (e, salt) => {
            if (e) {
                rej(e);
                return;
            }
            
            bcrypt.hash(password, salt, (er, hash) => {
                if (er) {
                    rej(er);
                    return;
                }
                res(hash);
            });
        });
    });
};

const comparePassword = (plainPass, hashword) => {
    return new Promise((res, rej) => {
        bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
            if (err) {
                rej(err);
                return;
            }
            res(isPasswordMatch);
        });
    });
};

module.exports = {
    registerUser: async data => {
        let encpass = await cryptPassword(data.password.toString());
        let user = new User({name: data.name, email: data.email, password: encpass });
        user = await user.save();
        const expiry = moment().add(30,"day").format("x");
        const token = await jwt.sign({ uid: user._id, expiry }, process.env.JWT_SECRATE);
        return token;
    },
    signinUser : async data => {
        let user = await User.findOne({email: data.email});
        if(user === null) throw new Error("User not found with provided email.");
        let isPasswordMatch = await comparePassword(data.password,user.password);
        if(isPasswordMatch === false) throw new Error("Password do not matched.");
        const expiry = moment().add(30,"day").format("x"); 
        const token = await jwt.sign({ uid: user._id, expiry }, process.env.JWT_SECRATE);
        return token;
    }
};
