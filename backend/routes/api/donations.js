var express = require('express');
var router = express.Router();

const donationController = require('../../controllers/api/donations/donationsController');
const authController = require('../../controllers/api/auth');

// Define more specific routes before parameterized routes
router.get('/collectionPoints', donationController.getCollectionPoints);

router.get('/', donationController.getAllDonations); //probably wont be used

router.post('/', donationController.newDonationRequest, authController.verifyTokenDonor);
router.get('/:id', donationController.findDonation, authController.verifyToken);
router.get('/donor/:donorId', donationController.findDonationsByDonorId, authController.verifyTokenDonor);

router.get('/requests', donationController.getAllRequests); //probably wont be used
router.get('/requests/:id', donationController.findRequest, authController.verifyToken);
router.get('/requests/donor/:userId', donationController.findDonationRequestsByUserId, authController.verifyTokenDonor);

router.get('/partner/:partnerId', donationController.findDonationsByPartnerId, authController.verifyTokenPartner);

router.put('/update-donation-state/:id', donationController.updateDonation, authController.verifyTokenPartner);

module.exports = router;
