const User = require("./../models/User");
const moment = require('moment');
var jwt = require('jsonwebtoken');

var exports = module.exports = {};

exports.error_resp = (req, res, e) => {
    res.locals.message = e.message;
    res.locals.error = req.app.get("env") === "development" ? e : {};

    res.status(e.status || 500);
    res.render("error");
};

exports.get_user_from_auth = async token => {
    var decoded = await jwt.verify(token, process.env.JWT_SECRATE);
    if (!!decoded) {
        let expired = moment().diff(moment(decoded.expiry,"x"), 'days') > 0;
        if (expired) { throw new Error('Auth token expired please renew it.'); }
        let user = await User.findOne({ _id: decoded.uid });
        if (user == null) throw new Error('Invalid Authorization token');
        return user;
    } else {
        throw new Error('Invalid Authorization token');
    }
}
