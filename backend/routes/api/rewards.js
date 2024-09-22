const express = require('express');
const router = express.Router();

const rewardsController = require('../../controllers/api/rewards')

router.get('/coupons',  rewardsController.viewCoupons)
   

router.post('/coupons/:donorId/:couponId', rewardsController.addCouponToDonor)

router.get('/coupons/:donorId', rewardsController.getDonorCoupons)

module.exports = router