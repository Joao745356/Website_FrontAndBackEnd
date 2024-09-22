const Donor = require('../../models/donor')
const Coupon = require('../../models/coupon')
const Reward = require('../../models/reward')

const rewardController = {}


rewardController.viewCoupons = async(req,res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons)
    } catch(err) {
        res.json(err)
    }
};

rewardController.addCouponToDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId; // Changed to donorId to be more specific
        const couponId = req.params.couponId;

       

        const donor = await Donor.findById(donorId);
        const coupon = await Coupon.findById(couponId)
        
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        if(donor.pointsEarned < coupon.cost){
            return res.status(402).json({message: 'You cant afford this'})
        }

        donor.coupons.push(coupon);
        donor.pointsEarned -= coupon.cost
        await donor.save();

        res.status(200).json({ message: 'Coupon added successfully', donor });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

rewardController.getDonorCoupons = async (req, res) => {
    try {
        const donorID = req.params.donorId;
        if (!donorID) {
            return res.status(400).json({ message: 'Donor ID required' });
        }
        const donor = await Donor.findById(donorID);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }
        const coupons = donor.coupons;
        let couponObjects = []; // Initialize the array
        for (const coupon of coupons) {
            const couponObject = await Coupon.findById(coupon);
            if (couponObject) {
                couponObjects.push(couponObject);
            }
        }
        res.status(200).json({ couponObjects });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', error: err });
    }
};

module.exports = rewardController