

var express = require('express');
var router = express.Router();
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const Admin = require('../models/admin')
const Staff = require('../models/staff')
const methodOverride = require('method-override')
const initializePassport = require('../passport-config')
const authController = require('../controllers/auth')
const config = require('../config')


router.use(flash())
router.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))


initializePassport(passport, async email => {
    const staff = await Staff.findOne({ email: email });
    const admin = await Admin.findOne({ email: email });

    return admin || staff;

}, async id => {

    const admin = await Admin.findOne({ _id: id });
    const staff = await Staff.findOne({ _id: id });


    return admin || staff;
});


router.get('/', (req, res) => {
    authController.login(req,res)
})


router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res, next) => {
    authController.submittedLogin(req,res,next)
});

router.delete('/logout', (req, res) => {

    authController.logout(req,res)

});




module.exports = router
