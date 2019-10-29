var passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var buyer = require('../Models/buyer');
var mongooose = require('../mongoose')

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = "CMPE_273_Grubhub_secret";
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log("JWT payload received", jwt_payload);
        buyer.findOne({ email: jwt_payload.email }, function (err, user) {
            if (err) {
                console.log("Error in passport" + err)
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};