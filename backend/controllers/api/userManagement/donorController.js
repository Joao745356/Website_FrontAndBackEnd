const Donor = require('../../../models/donor')
const bcrypt = require('bcrypt');

var donorController = {}

donorController.getAllDonors = async (req,res,next) =>{
    try {
        const donors = await Donor.find().exec();
        res.status(200).json(donors);
    } catch (error) {
        return res.status(500).json({error: "Could not retrieve donors."}) // Pass the error to the error handling middleware
    }
}

donorController.createDonor = async (req,res,next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const donor = new Donor({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        await donor.save()
        res.status(200).json(donor);
        
    } catch(error) {
        return res.status(500).json({error: "Something wrong happened."})
    }

}

donorController.updateDonor = async (req,res,next) => {
  
  try {
   const donor = await Donor.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email
    })

    await donor.save()
    res.json(donor)
  } catch(error) {
    next(error)
  }
}

donorController.deleteDonor = async(req,res,next) => {

    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);

        if (!donor) {
            // If the donor with the provided ID is not found
            return res.status(404).json({ error: 'Donor not found' });
        }
        
        res.status(200).send(); // Send a success response with no content
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

donorController.findDonor = async(req,res,next) =>{
    try {
        const donor = await Donor.findById(req.params.id);

        if(!donor){
            return res.status(404).json({error: "Donor not found"});
        }
        res.status(200).json(donor);

    }catch(error){
        next(error)
    }
}

module.exports = donorController