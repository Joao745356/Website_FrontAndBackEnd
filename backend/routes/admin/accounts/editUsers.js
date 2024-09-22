const express = require('express');
const router = express.Router();

const editingController = require('../../../controllers/admin/editUsers')


router.get('/admin/:id', async (req, res) => {
    editingController.showAdminEditForm(req,res)
})


router.get('/partner/:id', async (req, res) => {
    editingController.showPartnerEditForm(req,res)
})


router.get('/donor/:id', async (req, res) => {
    editingController.showDonorEditForm(req,res)
})

router.get('/staff/:id', async (req, res) => {
    editingController.showStaffEditForm(req,res)
})


router.put('/donor/:id', async function (req, res, next) {
   editingController.editDonor(req,res)
})

router.put('/staff/:id', async function (req, res, next) {
    editingController.editStaff(req,res)
})


router.put('/partner/:id', async function (req, res, next) {
    editingController.editPartner(req,res)
})


router.put('/admin/:id', async function (req, res, next) {
    editingController.editAdmin(req,res)
})


module.exports = router 