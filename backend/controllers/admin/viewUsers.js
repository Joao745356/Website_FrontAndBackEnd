const Admin = require('../../models/admin')
const Donor = require('../../models/donor')
const Staff = require('../../models/staff')
const Partner = require('../../models/partner')


viewingController = {};

viewingController.viewStaff = async (req, res) => {
    let searchOption = {}
    if (req.query.email != null && req.query.email !== '') {
        searchOption.email = new RegExp(req.query.email, 'i')
    }
    try {
        const staff = await Staff.find(searchOption);
        res.render('staff/index', {
            staff: staff,
            title: 'Staff',
            searchOption: req.query,
            user: req.userName 
        })
    } catch {
        res.redirect('/')
    }
}


viewingController.viewAdmins = async (req, res) => {
    let searchOption = {}
    if (req.query.email != null && req.query.email !== '') {
        searchOption.email = new RegExp(req.query.email, 'i')
    }
    try {
        const admins = await Admin.find(searchOption);
        res.render('admin/index', {
            admins: admins,
            title: 'Admins',
            searchOption: req.query,
            user: req.userName 
        })
    } catch {
        res.redirect('/')
    }
}


viewingController.viewDonors = async (req, res) => {
    let searchOption = {}
    if (req.query.email != null && req.query.email !== '') {
        searchOption.email = new RegExp(req.query.email, 'i')
    }
    try {
        const donors = await Donor.find(searchOption);
        res.render('donors/index', {
            donors: donors,
            title: 'Donors',
            searchOption: req.query,
            user: req.userName 
        })
    } catch {
        res.redirect('/')
    }
}
viewingController.viewPartners = async (req, res) => {
    let searchOption = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOption.name = new RegExp(req.query.name, 'i')
    }
    try {
        const partners = await Partner.find(searchOption);
        res.render('partners/indexForAdmin', {
            partners: partners,
            title: 'Partners',
            searchOption: req.query,
            user: req.userName 
        })
    } catch {
        res.redirect('/')
    }
}




module.exports = viewingController