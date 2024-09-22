const express = require('express');
const router = express.Router();

const donationController = require ('../../controllers/staff/donations')
const userController = require ('../../controllers/staff/user')

router.get('/', function (req, res) {
    donationController.home(req,res)
});

router.get('/registerDonation', (req, res) => {
    donationController.newDonationForm(req,res)
});

router.get('/viewDonations', async (req, res) => {
    donationController.viewDonations(req,res)
}
)

router.post("/registerDonation", async (req, res) => {
    donationController.newDonation(req,res)
});

router.get("/registerDonators", async (req,res) =>{
    userController.registerDonorForm(req,res)
});

router.post("/registerDonators", async (req,res) =>{
    userController.registerDonor(req,res)
});

router.get('/donationRequests', async(req,res) => {
   donationController.viewDonationRequests(req,res)
})//get list of requests

router.get('/donationRequests/:id', async(req,res) => {
    donationController.viewDonationRequest(req,res)
}) //get specific request

router.delete('/donationRequests/:id', async(req,res) => {
    donationController.deleteRequest(req,res)
}) //delete specific request

router.post('/acceptRequest/:id', async(req,res)=>{
    donationController.acceptRequest(req,res)
})

module.exports = router;