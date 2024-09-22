const Admin = require('../../../models/admin')
const bcrypt = require('bcrypt');

var adminController = {}

adminController.getAllAdmins = async (req,res,next) =>{
    try {
        const admins = await Admin.find().exec();
        res.json(admins);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

adminController.createAdmin = async (req,res,next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        await admin.save()
        res.json(admin)
        
    } catch(error) {
        next(error)
    }

}

adminController.updateAdmin = async (req,res,next) => {

  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email
    })

    await admin.save()
    res.json(admin)
  } catch(error) {
    next(error)
  }
}

adminController.deleteAdmin = async(req,res,next) => {

    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        
        res.status(200).send(); // Send a success response with no content
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

adminController.findAdmin = async(req,res,next) =>{
    try {
        const admin = await Admin.findById(req.params.id);

        if(!admin){
            return res.status(404).json({error: "Admin not found"});
        }
        res.status(200).json(admin);

    }catch(error){
        next(error)
    }
}

module.exports = adminController