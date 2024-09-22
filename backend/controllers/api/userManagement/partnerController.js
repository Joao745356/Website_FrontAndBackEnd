const PartnershipRequest = require('../../../models/partnershipRequest')
const Partner = require('../../../models/partner')

const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path')
const fs = require('fs')


const uploadPath = path.join('public', Partner.partnerImagePath);
const imageMimeTypes = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg'); // Appending .jpg
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
}).single('image');


const partnerController = {}


partnerController.getAllPartners = async (req,res,next) =>{
    try {
        const partners = await Partner.find().exec();
        res.json(partners);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}

partnerController.createPartner = async (req, res, next) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.error(err);
            return res.status(400).json({ error: 'Error uploading image' });
        } else if (err) {
           // Unknown error occurred
           console.error(err);
           return res.status(500).json({ error: 'Unknown error uploading image' });
       }

        // File upload is successful, proceed with partner registration
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        if(!req.filename){
            res.send.status(400).json({error: 'Image is required.'})
        }
        const filename = req.file = req.file.filename;

        try {
            const partner = new PartnershipRequest({
                name: req.body.name,
                email: req.body.email,
                description: req.body.description,
                dateOfRegistry: Date.now(),
                numberOfDonations: 0,
                password: hashedPassword,
                imageName: filename
            });


            await partner.save();
            res.status(200).json(partner);
        } catch (error) {
            return res.status(404).json({ error: 'Error with registration' });
        }
    });
}


partnerController.updatePartner = async (req,res,next) => {

    try {
      const partner = await Partner.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description
      })
  
      await partner.save()
      res.json(partner)
    } catch(error) {
      next(error)
    }
  }
  
  partnerController.deletePartner = async(req,res,next) => {
  
      try {
          const partner = await Partner.findByIdAndDelete(req.params.id);
  
          if (!partner) {
              return res.status(404).json({ error: 'partner not found' });
          }
          
          res.status(200).send(); // Send a success response with no content
      } catch (error) {
          next(error); // Pass the error to the error handling middleware
      }
  }
  
    partnerController.findPartner = async(req,res,next) =>{
      try {
          const partner = await Partner.findById(req.params.id);
  
          if(!partner){
              return res.status(404).json({error: "partner not found"});
          }
          res.status(200).json(partner);
  
      }catch(error){
          next(error)
      }
  }


  partnerController.getImages = (req, res) => {
    
    const imageName = req.params.imageName;
    if(imageName){
        const imagePath = path.join(uploadPath, imageName); 
  
        // Check if the file exists
        fs.access(imagePath, fs.constants.F_OK, (err) => {
          if (err) {
            // File does not exist
            return res.status(404).send('Image not found');
          }
      
          // File exists, stream it to the response
          const imageStream = fs.createReadStream(imagePath);
          imageStream.on('error', (error) => {
            console.error('Error reading image file', error);
            res.status(500).send('Error reading image file');
          });
          imageStream.pipe(res);
        });
    }else{
        res.status(404).send('no name')
    }
   
  
  }
  
  module.exports = partnerController