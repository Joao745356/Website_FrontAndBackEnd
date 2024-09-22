var express = require('express');
var router = express.Router();
var authController = require('../../controllers/api/auth');

router.post('/login', authController.login );
router.post('/registerDonor', authController.registerDonor );
router.post('/registerPartner', authController.registerPartner );
  
//send reset email

router.post('/send-email', authController.sendEmail )

router.post('/reset-password', authController.resetPassword)

module.exports = router;
