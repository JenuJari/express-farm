const Auth = require("./../models/Auth");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const moment = require("moment");

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
        let token = md5(user._id + '_' + moment().unix());
        let expir = moment().add(5,"days").toDate(); 
        let auth = new Auth({token: token, userid: user._id, expriry: expir });
        auth = await auth.save();
        return auth;
    },
    signinUser : async data => {
        let user = await User.findOne({email: data.email});
        if(user == null) throw new Error("User not found with provided email.");
        let isPasswordMatch = await comparePassword(data.password,user.password);
        if(isPasswordMatch == false) throw new Error("Password do not matched.");
        let token = md5(user._id + '_' + moment().unix());
        let expir = moment().add(5,"days").toDate(); 
        let auth = new Auth({token: token, userid: user._id, expriry: expir });
        auth = await auth.save();
        return auth;
    },
    demoAsync : t => {
        return new Promise((res,rej) => {
            try {
                setTimeout(() => {
                    res('Your wait time ' + (t/1000) + ' sec is over.');
                }, t);
                 throw new Error('listId does not exist');
            } catch(e) {
                rej(e);
            }
        });
    }
};
