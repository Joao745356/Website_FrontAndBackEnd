const express = require('express');
const router = express.Router();

registerController = require('../../../controllers/admin/registerUsers')

router.get('/', function (req, res) {
   registerController.home(req,res)
});

router.get('/registerAdmin', (req, res) => {
   registerController.registerAdminForm(req,res)

})

router.get('/registerDonor', (req, res) => {
    registerController.registerDonorForm(req,res)

})

router.get('/registerPartner', (req, res) => {
    registerController.registerPartnerForm(req,res)

})

router.get('/registerStaff', (req, res) => {
    registerController.registerStaffForm(req,res)

})

//Register Admin
router.post('/registerAdmin', async (req, res) => {
    registerController.registerAdmin(req,res)
})


//register staff
router.post('/registerStaff', async (req, res) => {
    registerController.registerStaff(req,res)
})


//Register Donor
router.post('/registerDonor', async (req, res) => {
    registerController.registerDonor(req,res)
})

//Register Institution
router.post('/registerPartner', async (req, res) => {
   registerController.registerPartner(req,res)
});

router.get('/partnershipRequests', async(req,res) => {
    registerController.viewPartnershipRequests(req,res)
})//get list of requests

router.get('/partnershipRequests/:id', async(req,res) => {
    registerController.viewPartnershipRequest(req,res)
}) //get specific request

router.post('/acceptRequests/:id', async(req,res)=>{
    registerController.acceptPartnerRequest(req,res)
})
module.exports = router;