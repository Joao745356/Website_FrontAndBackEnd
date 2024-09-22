const express = require('express');
const router = express.Router();

const rewardController = require('../../controllers/admin/rewards')

router.get('/', function(req, res, next) {
    rewardController.home(req,res)
});

router.get('/points', function(req, res, next) {
    rewardController.editRewardsForm(req,res)
});


router.put('/points', async (req, res) => {
    rewardController.editRewards(req,res)
});


router.get('/coupons', function(req, res, next) {
    rewardController.createCouponsForm(req,res)
});

router.get('/coupons/view', async function(req, res, next) {
    rewardController.viewCoupons(req,res)
});

router.post('/coupons', async (req, res) => {
    rewardController.createCoupons(req,res)
})


module.exports = router;
