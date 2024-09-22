var express = require('express');
var router = express.Router();

const donorController = require('../../controllers/api/userManagement/donorController')
const adminController = require('../../controllers/api/userManagement/adminController')
const staffController = require('../../controllers/api/userManagement/staffController')
const partnerController = require('../../controllers/api/userManagement/partnerController')
const authController = require ('../../controllers/api/auth')
const Partner = require('../../models/partner')

router.get('/donors', donorController.getAllDonors)
router.post('/donors', donorController.createDonor, authController.registerDonor)
router.get('/donors/:id', donorController.findDonor)
router.put('/donors/:id', donorController.updateDonor) //resets password 
router.delete('/donors/:id', donorController.deleteDonor)


router.get('/admins', adminController.getAllAdmins)
router.post('/admins', adminController.createAdmin)
router.get('/admins/:id', adminController.findAdmin)
router.put('/admins/:id', adminController.updateAdmin)
router.delete('/admins/:id', adminController.deleteAdmin)


router.get('/staff', staffController.getAllStaff)
router.post('/staff', staffController.createStaff)
router.get('/staff/:id', staffController.findStaff)
router.put('/staff/:id', staffController.updateStaff)
router.delete('/staff/:id', staffController.deleteStaff)


router.get('/partners', partnerController.getAllPartners)
router.post('/partners', partnerController.createPartner)
router.get('/partners/:id', partnerController.findPartner)
router.put('/partners/:id', partnerController.updatePartner)
router.delete('/partners/:id', partnerController.deletePartner)

router.get('/partners/images/:imageName',partnerController.getImages)

module.exports = router;