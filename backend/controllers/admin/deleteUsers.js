const Admin = require('../../models/admin')
const Donor = require('../../models/donor')
const Staff = require('../../models/staff')
const Partner = require('../../models/partner')
const Request = require('../../models/partnershipRequest')
const path = require('path')
const fs = require('fs')

const uploadPath = path.join("public", Partner.partnerImagePath);

var deletingController = {};

deletingController.deleteStaff = async (req, res) => {
    let staff
    try {
        staff = await Staff.findByIdAndDelete(req.params.id)

        res.redirect('/admin/manage-accounts/view/staff-members/')
    } catch (err) {
        if (staff == null) {
            res.redirect('/admin/manage-accounts/view/staff-members/')
        } else {
            res.redirect(`/admin/manage-accounts/view/staff-members/`)
            console.log(err)
        }
    }
}

deletingController.deleteAdmin = async (req, res) => {
    let admin
    try {
        admin = await Admin.findByIdAndDelete(req.params.id)
        res.redirect('/admin/manage-accounts/view/admins/')
    } catch {
        if (admin == null) {
            res.redirect('/admin/manage-accounts/view/admins/')
        } else {
            res.redirect(`/admin/manage-accounts/view/admins/`)
        }
    }
}

deletingController.deletePartner = async (req, res) => {
  try {
      const partner = await Partner.findById(req.params.id);
      
      if (!partner) {
          return res.redirect('/admin/manage-accounts/view/partners/');
      }

      // Construct the path to the image file
      const imagePath = path.join(uploadPath, partner.imageName);

      // Delete the partner from the database
      await Partner.findByIdAndDelete(req.params.id);

      // Delete the image file
      fs.unlink(imagePath, (err) => {
          if (err) {
              console.error(`Error deleting image file: ${err}`);
          }
      });

      res.redirect('/admin/manage-accounts/view/partners/');
  } catch (error) {
      console.error(`Error deleting partner: ${error}`);
      res.redirect('/admin/manage-accounts/view/partners/');
  }
};

deletingController.deleteDonor = async (req, res) => {
    let donor
    try {
      donor = await Donor.findByIdAndDelete(req.params.id)
      res.redirect('/admin/manage-accounts/view/registered-donors/')
    } catch(err) {
      if (donor == null) {
        res.redirect('/admin/manage-accounts/view/registered-donors/')
      } else {
        res.redirect(`/admin/manage-accounts/view/registered-donors/`)
      }
      console.log(err)
    }
}


deletingController.deleteRequest = async (req, res) => {
  let request = await Request.findById(req.params.id)
  const imagePath = ''
  try {

    if(request.imageName){
      imagePath = path.join(uploadPath, request.imageName);
    }
    // Construct the path to the image file
    

    // Delete the partner from the database
    await Request.findByIdAndDelete(req.params.id);

    
    if(imagePath != ''){
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(`Error deleting image file: ${err}`);
        }
    });
  }

    res.redirect('/admin/manage-accounts/register/partnershipRequests')
  } catch(err) {
    if (request == null) {
      res.redirect('/admin/manage-accounts/register/partnershipRequests')
    } else {
      res.redirect(`/admin/manage-accounts/register/partnershipRequests`)
    }
    console.log(err)
  }
}


module.exports = deletingController