const express = require('express');
const router = express.Router();

const deletingController = require('../../../controllers/admin/deleteUsers')

router.delete('/donor/:id', async function (req, res, next) {
    deletingController.deleteDonor(req,res)
})

router.delete('/staff/:id', async function (req, res, next) {
  deletingController.deleteStaff(req,res)
  });

router.delete('/admin/:id', async function (req, res, next) {
  deletingController.deleteAdmin(req,res)
});

router.delete('/partner/:id', async function (req, res, next) {
  deletingController.deletePartner(req,res)
});

router.delete('/partnershipRequests/:id', async function (req, res){
  deletingController.deleteRequest(req,res)
})

module.exports = router