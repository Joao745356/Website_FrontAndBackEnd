const express = require('express');
const router = express.Router();
const Donor = require('../../models/donor')
const Donation = require('../../models/donation')
const CollectionPoint = require('../../models/collectionPoint')


router.get('/', async function (req, res, next) {
    let numberOfDonators = await Donor.countDocuments()
    const today = new Date();

    // Construct the query to count documents added in the current week
    let totalDonations = await Donation.countDocuments({
        date: { 
            $lt: today // Less than the end of the week
        }
    })

    let collectionPoints = await CollectionPoint.countDocuments()

    res.render('admin/dashboard.ejs', { title: 'Admin Homepage', numberOfDonators: numberOfDonators, totalDonations:totalDonations, totalCollectionPoints: collectionPoints, user: req.userName });
});

const accountnManagementRouter = require('./accounts/accountManagement');
const couponManagementRouter = require('./rewardManagement');
const collectionPointRouter = require('./collectionPoint')


router.use('/manage-accounts', accountnManagementRouter);
router.use('/manage-rewards', couponManagementRouter);
router.use('/manage-collectionPoints', collectionPointRouter);


module.exports = router;
