
Donor = require('../../models/donor')
const bcrypt = require('bcrypt');

userController = {}

userController.registerDonorForm = (req,res) =>{
    res.render('staff/registerDonors.ejs', { title: 'Register Donor',  user: req.userName  })
}

userController.registerDonor = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const donor = new Donor({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        await donor.save()
        res.redirect(`/admin/manage-accounts/view/registered-donors/`)
    } catch {
        res.render('admin/accountManagement/register/registerDonor'), {
            donor: donor,
            errorMessage: 'Error creating user',
            user: req.userName
        }
    }
}



    
    module.exports = userController