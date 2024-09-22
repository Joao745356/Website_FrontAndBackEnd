const express = require('express');
const router = express.Router();

const viewingController = require('../../../controllers/admin/viewUsers')

router.get('/staff-members', async function (req, res, next) {
    viewingController.viewStaff(req,res)
});

router.get('/registered-donors', async function (req, res, next) {
    viewingController.viewDonors(req,res)
});

router.get('/admins', async function (req, res, next) {
    viewingController.viewAdmins(req,res)
});


router.get('/partners', async function (req, res, next) {
    viewingController.viewPartners(req,res)
})


router.get('/partners/:id', async (req, res) => {
    viewingController.viewPartner(req,res)
})


module.exports = router
