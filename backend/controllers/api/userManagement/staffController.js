const Staff = require('../../../models/staff')
const bcrypt = require('bcrypt');

var staffController = {}

staffController.getAllStaff = async (req,res,next) =>{
    try {
        const staff = await Staff.find().exec();
        res.json(staff);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

staffController.createStaff = async (req,res,next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const staff = new Staff({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        await staff.save()
        res.json(staff)
        
    } catch(error) {
        next(error)
    }

}

staffController.updateStaff = async (req,res,next) => {

  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email
    })

    await staff.save()
    res.json(staff)
  } catch(error) {
    next(error)
  }
}

staffController.deleteStaff = async(req,res,next) => {

    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);

        if (!staff) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        
        res.status(200).send(); // Send a success response with no content
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

staffController.findStaff = async(req,res,next) =>{
    try {
        const staff = await Staff.findById(req.params.id);

        if(!staff){
            return res.status(404).json({error: "Admin not found"});
        }
        res.status(200).json(staff);

    }catch(error){
        next(error)
    }
}

module.exports = staffController