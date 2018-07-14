const Auth = require("./../models/Auth");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const moment = require("moment");
moment()
    .add("days", 5)
    .toDate();
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

/*const comparePassword = (plainPass, hashword) => {
    return new Promise((res, rej) => {
        bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
            if (err) {
                rej(err);
                return;
            }
            res(isPasswordMatch);
        });
    });
};*/

module.exports = {
    registerUser: data => {
        return new Promise((res, rej) => {
            cryptPassword(data.password.toString()).then(encpass => {
                const user = new User({
                    name: data.name,
                    email: data.email,
                    password: encpass
                });

                user
                    .save()
                    .then(user => {
                        let token = md5(user._id);
                        let expir = moment()
                            .add("days", 5)
                            .toDate();
                        const auth = new Auth({
                            token: token,
                            userid: user._id,
                            expriry: expir
                        });
                        auth.save().then(res).catch(rej);
                    })
                    .catch(rej);
            });
        });
    }
};
