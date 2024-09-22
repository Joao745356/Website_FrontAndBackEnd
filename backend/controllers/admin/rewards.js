const Coupon = require('../../models/coupon')
const Reward = require('../../models/reward')


rewardController = {};

rewardController.home = (req, res) => { res.render('admin/couponManagement/dashboard',  {title: 'Manage Rewards',  user: req.userName }); }

rewardController.editRewardsForm = async (req,res) => {
    let reward = await Reward.findOne({})
    res.render('admin/couponManagement/rewards', {title: 'Rewards',  user: req.userName, reward: reward });
};


rewardController.editRewards = async(req,res) => {
    let baseQuantity = req.body.quantity
    let points = req.body.points
    let poorPercentage = req.body.poor
    let fairPercentage = req.body.fair
    let goodPercentage = req.body.good
    

// Grade A or Excellent/Like New: Items in almost new condition with minimal signs of wear. They may appear unworn and have no significant flaws.

// Grade B or Good/Very Good: Items with moderate signs of wear but still in good condition. There might be slight fading, minor pilling, or small imperfections.

// Grade C or Fair: Clothing with noticeable wear, fading, or defects. These items may still be functional but may require some repairs or alterations.

// Grade D or Poor: Items in poor condition with significant wear, stains, tears, or other defects. They may be suitable for upcycling or used for fabric recycling
    try {
        await Reward.findOneAndUpdate({}, { 
            BaseQuantity: baseQuantity, 
            points: points,
            poorPercentage:poorPercentage,
            fairPercentage:fairPercentage,
            goodPercentage:goodPercentage,
         }, { upsert: true });
        res.redirect('/admin')
    } catch (error) {
        res.redirect('/')
        console.log(err)
    }
};


rewardController.createCouponsForm = async(req,res) => {
    res.render('admin/couponManagement/coupons',  {title: 'Coupons',  user: req.userName });
};

rewardController.viewCoupons = async(req,res) => {
    let searchOption = {}
    if (req.query.sponsor != null && req.query.sponsor !== '') {
        searchOption.sponsor = new RegExp(req.query.sponsor, 'i')
    }
    try {
        const coupons = await Coupon.find(searchOption);
        res.render('admin/couponManagement/viewCoupons', {
            coupons: coupons,
            title: 'Coupons',
            searchOption: req.query,
            user: req.userName 
        })
    } catch {
        res.redirect('/')
    }
};

rewardController.createCoupons = async(req,res) => {
    
    const coupon = new Coupon({
        sponsor: req.body.sponsor,
        value: req.body.value,
        cost: req.body.cost
    })

    try {
        await coupon.save()
        res.redirect(`/admin/manage-rewards/coupons/view`)

    } catch {
        res.render('admin/manage-rewards/coupons'), {
            admin: admin,
            errorMessage: 'Error creating coupon',
            user: req.userName 
        }
    }
}

module.exports = rewardController