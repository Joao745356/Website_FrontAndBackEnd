const Admin = require('../../models/admin')
const Donor = require('../../models/donor')
const Staff = require('../../models/staff')
const Partner = require('../../models/partner')


var editingController = {};

editingController.showAdminEditForm = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
    res.render('admin/accountManagement/edit/editAdmin', {
      admin: admin,
      title: 'Update Admin',
      user: req.userName 
    })
  } catch (err) {
    console.log(err)
    res.redirect('/admin/manage-accounts/view/admins/')
  }
}

editingController.showPartnerEditForm = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id)
    res.render('admin/accountManagement/edit/editPartner', {
      partner: partner,
      title: 'Update Partner',
      user: req.userName 
    })
  } catch (err) {
    console.log(err)
    res.redirect('/admin/manage-accounts/view/partners/')
  }
}

editingController.showStaffEditForm = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
    res.render('admin/accountManagement/edit/editStaff', {
      staff: staff,
      title: 'Update Staff',
      user: req.userName 
    })
  } catch (err) {
    console.log(err)
    res.redirect('/admin/manage-accounts/view/staff-members/')
  }
}

editingController.showDonorEditForm = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id)
    res.render('admin/accountManagement/edit/editDonor', {
      donor: donor,
      title: 'Update Donor',
      user: req.userName 
    })
  } catch (err) {
    console.log(err)
    res.redirect('/admin/manage-accounts/view/registered-donors/')
  }
}




editingController.editAdmin = async (req, res) => {
  let admin
  try {
    admin = await Admin.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      email: req.body.email
    })

    await admin.save()
    res.redirect(`/admin/manage-accounts/view/admins/`)
  } catch {
    if (admin == null) {
      res.redirect('/admin/manage-accounts/view/admins/')
    } else {
      res.render('admin/accountManagement/edit/editAdmin', {
        admin: admin,
        errorMessage: 'Error updating Admin'
      })
    }
  }
}


editingController.editDonor = async (req, res) => {
  let donor
  try {
    donor = await Donor.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email
    })

    await donor.save()
    res.redirect(`/admin/manage-accounts/view/registered-donors/`)
  } catch {
    if (donor == null) {
      res.redirect('/admin/manage-accounts/view/registered-donors/')
    } else {
      res.render('admin/accountManagement/edit/editDonor', {
        donor: donor,
        errorMessage: 'Error updating Donor',
        title: 'Edit Donor'
      })
    }
  }
}


editingController.editPartner = async (req, res) => {
  let partner
  try {
    partner = await Partner.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      description: req.body.description
    })
    await partner.save()
    res.redirect(`/admin`)
  } catch (err) {
    if (partner == null) {
      res.redirect('/admin/manage-accounts/view/partners/')
    } else {
      res.render('admin/accountManagement/edit/editPartner', {
        partner: partner,
        errorMessage: 'Error updating Partner'
      })
    }
    console.log(err)
  }
}


editingController.editStaff = async (req, res) => {
  let staff
  try {
    staff = await Staff.findById(req.params.id)
    staff.name = req.body.name
    staff.email = req.body.email
    await staff.save()
    res.redirect(`/admin/manage-accounts/view/staff-members/`)
  } catch (err) {
    if (staff == null) {
      res.redirect('/admin/manage-accounts/view/staff-members/')
      console.log(err)
    } else {
      res.render('admin/accountManagement/edit/editStaff', {
        staff: staff,
        errorMessage: 'Error updating Staff',
        title: 'Edit Staff'
      })
      console.log(err)
    }
  }
}

module.exports = editingController;