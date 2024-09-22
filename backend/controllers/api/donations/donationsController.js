const Donation = require('../../../models/donation')
const DonationRequest = require('../../../models/donationRequests')
const Reward = require('../../../models/reward')
const Donor = require('../../../models/donor')
const CollectionPoint = require('../../../models/collectionPoint')

const multer = require('multer');
const path = require('path')

const uploadPath = path.join('public', Donation.donationImagePath);
const imageMimeTypes = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg'); // Appending .jpg
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
}).single('image');


const donationController = {}

donationController.newDonationRequest = async (req, res) => {

        const donation = new DonationRequest({
            donor: req.body.donor,
            quantity: req.body.quantity,
            dateToCollect: req.body.date,
            quality: req.body.quality,
            institution: req.body.institution,
            location: req.body.location,
        });

        try { 
            await donation.save()
            res.json(donation)
        } catch (error) {
            console.log(error)
        }
    
}

donationController.getAllDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find().exec();
        res.json(donations);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

donationController.findDonation = async(req,res,next) =>{
    try {
        const donation = await Donation.findById(req.params.id);

        if(!donation){
            return res.status(404).json({error: "donation not found"});
        }
        res.status(200).json(donation);

    }catch(error){
        next(error)
    }
}

donationController.getAllRequests = async(req,res, next) => {
    try{
        const requests = DonationRequest.find().exec();
        res.json(requests);
    } catch (error) {
        next(error)
    }
}

donationController.findRequest = async(req,res,next) =>{
    try {
        const request = await DonationRequest.findById(req.params.id);

        if(!request){
            return res.status(404).json({error: "request not found"});
        }
        res.status(200).json(request);

    }catch(error){
        next(error)
    }
}

donationController.findDonationsByDonorId = async (req,res,next) => {
    try{
        const donations = await Donation.find({donor: req.params.donorId})

        if(!donations){
            return res.status(404).json({error: "donations not found"});
        }
        res.status(200).json(donations);
    }catch(error){
        next(error)
}
}

donationController.findDonationsByPartnerId = async (req,res,next) => {
    try{
        const donations = await Donation.find({institution: req.params.partnerId})

        if(!donations){
            return res.status(404).json({error: "donations not found"});
        }
        res.status(200).json(donations);
    }catch(error){
        next(error)
}
}


donationController.findDonationRequestsByUserId = async (req,res,next) => {
    try{
        const donations = await DonationRequest.find({donor: req.params.userId})

        if(!donations){
            return res.status(404).json({error: "requests not found"});
        }
        res.status(200).json(donations);
    }catch(error){
        next(error)
}
}

donationController.updateDonation = async (req,res,next) => {

    try {
      const donation = await Donation.findByIdAndUpdate(req.params.id, {
        state: req.body.state,
      })
  
      await donation.save()
      res.json(donation)
    } catch(error) {
      next(error)
    }
  }
  

donationController.getCollectionPoints = async (req,res,next) =>{
    try {
        const collectionPoints = await CollectionPoint.find().exec();
        console.log('Collection Points:', collectionPoints); // Log data
        res.json(collectionPoints);
    } catch (err) {
        console.error(err);  // Log the error for debugging
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = donationController