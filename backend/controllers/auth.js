const Admin = require('../models/admin')
const Staff = require('../models/staff')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

let authController = {}

authController.submittedLogin = async function (req, res, next) {
    const emailInput = req.body.email
    const passwordInput = req.body.password

    const staff = await Staff.findOne({ email: emailInput });
    const admin = await Admin.findOne({ email: emailInput });

    if (!staff && !admin) {
        // Handle case where user is not found
        return res.redirect('/login');
    }

    const user = staff || admin;

    (function (user) {
        bcrypt.compare(passwordInput, user.password)
            .then(function (result) {
                if (result === true) {
                    const authToken = jwt.sign({ email: user.email, role: user.role, name: user.name }, config.JWT_SECRET, { expiresIn: 86400 });
                    res.cookie('auth-token', authToken, { maxAge: 34560000 });
                    if(user.role === 'staff'){
                        res.redirect('/staff');
                    }
                    else if(user.role === 'admin'){
                        res.redirect('/admin');
                    }
                    
                } else {
                    res.redirect('/login');
                }
            })
            .catch(function (err) {
                next(err);
            });
    })(user);
};

authController.login = function (req, res, next) {
    res.render('login/loginIndex', {title: 'Login'})
};

authController.logout = function (req, res, next) {
    res.clearCookie('auth-token')
    res.redirect('/')
};

authController.verifyLogin = function (req, res,next) {
    const authToken = req.cookies['auth-token'];
    if (authToken) {
        jwt.verify(authToken, config.JWT_SECRET, function (err, decoded) {
            if (err) {
                // Token verification failed
                return res.redirect('/auth/login');
            }
            // Token verification successful, set decoded user information on request object
            req.userEmail = decoded.email;
            req.userRole = decoded.role;
            req.userName = decoded.name;

            // Check user role and redirect accordingly
            if (req.userRole === 'admin') {

                if (req.originalUrl.startsWith('/admin')) {
                    next(); // Continue to next middleware
                } else {
                    res.redirect('/admin'); // Redirect to admin dashboard
                }
              
            } else if (req.userRole === 'staff') {
                if (req.originalUrl.startsWith('/staff')) {
                    next(); // Continue to next middleware
                } else {
                    res.redirect('/staff'); // Redirect to staff dashboard
                }
                
            } else {
                // Handle other roles or unauthorized access
                res.redirect('/login');
            }
        });
    } else {
        // No auth token found
        res.redirect('/login');
    }
};
module.exports = authController;