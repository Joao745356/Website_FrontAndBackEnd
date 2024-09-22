const Admin = require("../../models/admin");
const Donor = require("../../models/donor");
const Staff = require("../../models/staff");
const Partner = require("../../models/partner");
const PartnershipRequests = require("../../models/partnershipRequest");

const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const { title } = require("process");

const uploadPath = path.join("public", Partner.partnerImagePath);
const imageMimeTypes = ["image/jpeg", "image/png", "image/jpeg"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const originalExtension = file.originalname.split('.').pop();
    cb(null, Date.now() + '.' + originalExtension); 
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (imageMimeTypes.includes(file.mimetype)) {
      // File type is allowed, accept it
      callback(null, true);
    } else {
      // File type is not allowed, reject it
      callback(new Error('Only JPG and PNG files are allowed.'));
    }
  },
}).single("image");

registerController = {};

registerController.home = (req, res) => {
  res.render("admin/accountManagement/register/dashboard.ejs", {
    title: "Account Management",
    user: req.userName,
  });
};

registerController.registerAdminForm = (req, res) => {
  res.render("admin/accountManagement/register/registerAdmin.ejs", {
    title: "Register Admin",
    user: req.userName,
  });
};
registerController.registerPartnerForm = (req, res) => {
  res.render("admin/accountManagement/register/registerPartner.ejs", {
    title: "Register Partner",
    user: req.userName,
  });
};
registerController.registerStaffForm = (req, res) => {
  res.render("admin/accountManagement/register/registerStaff.ejs", {
    title: "Register Staff",
    user: req.userName,
  });
};
registerController.registerDonorForm = (req, res) => {
  res.render("admin/accountManagement/register/registerDonor.ejs", {
    title: "Register Donor",
    user: req.userName,
  });
};

registerController.registerAdmin = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await admin.save();
    res.redirect(`/admin/manage-accounts/view/admins/`);
  } catch {
    res.render("admin/accountManagement/register/registerAdmin"),
      {
        admin: admin,
        errorMessage: "Error creating user",
        user: req.userName,
      };
  }
};
registerController.registerPartner = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error(err);
      return res.render("admin/accountManagement/register/registerPartner", {
        errorMessage: "Error uploading image",
        user: req.userName,
      });
    } else if (err) {
      console.error(err);
      return res.render("admin/accountManagement/register/registerPartner", {
        errorMessage: "Unknown error uploading image",
        user: req.userName,
      });
    }

    // File upload is successful, proceed with partner registration
    const password = req.body.password;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (bcryptError) {
      console.error(bcryptError);
      return res.render("admin/accountManagement/register/registerPartner", {
        errorMessage: "Error hashing password",
        user: req.userName,
      });
    }

    const filename = req.file ? req.file.filename : null;

    const partner = new Partner({
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      dateOfRegistry: Date.now(),
      numberOfDonations: 0,
      password: hashedPassword,
      imageName: filename,
    });

    try {
      await partner.save();
      res.redirect(`/admin/manage-accounts/view/partners`);
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyValue && err.keyPattern.email === 1) {
        res.render("admin/accountManagement/register/registerPartner", {
          title: "Register Partner",
          partner: partner,
          errorMessage: "Email address is already in use.",
          user: req.userName,
        });
      } else {
        console.error(err);
        res.render("admin/accountManagement/register/registerPartner", {
          title: "Register Partner",
          partner: partner,
          errorMessage: "Error creating user. Please try again later.",
          user: req.userName,
        });
      }
    }
  });
};

registerController.registerStaff = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const staff = new Staff({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await staff.save();
    res.redirect(`/admin/manage-accounts/view/staff-members/`);
  } catch (err) {
    if (
      err.code === 11000 &&
      err.keyPattern &&
      err.keyValue &&
      err.keyPattern.email === 1
    ) {
      // Duplicate key error for the email field
      res.render("admin/accountManagement/register/registerStaff", {
        title: "Register Staff",
        staff: staff,
        errorMessage: "Email address is already in use.",
        user: req.userName,
      });
    } else {
      res.render("admin/accountManagement/register/registerStaff", {
        title: "Register Staff",
        staff: staff,
        errorMessage: "Error creating user. Please try again later.",
        user: req.userName,
      });
    }
    console.log(err);
  }
};

registerController.registerDonor = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const donor = new Donor({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await donor.save();
    res.redirect(`/admin/manage-accounts/view/registered-donors/`);
  } catch (err) {
    if (
      err.code === 11000 &&
      err.keyPattern &&
      err.keyValue &&
      err.keyPattern.email === 1
    ) {
      res.render("admin/accountManagement/register/registerDonor", {
        title: "Register Staff",
        donor: donor,
        errorMessage: "Email address is already in use.",
        user: req.userName,
      });
    } else {
      res.render("admin/accountManagement/register/registerDonor", {
        title: "Register Donor",
        donor: donor,
        errorMessage: "Error creating user. Please try again later.",
        user: req.userName,
      });
    }
  }
};

registerController.viewPartnershipRequests = async (req, res) => {
  try {
    const requests = await PartnershipRequests.find();
    res.render("admin/accountManagement/register/partnershipRequests", {
      requests: requests,
      title: "Partnership requests",
      user: req.userName,
    });
  } catch {
    res.redirect("/");
  }
};

registerController.viewPartnershipRequest = async (req, res) => {
  const requestId = req.params.id;
  if (requestId) {
    const request = await PartnershipRequests.findById(requestId);

    res.render("admin/accountManagement/register/partnershipRequest", {
      title: "Register Partner",
      user: req.userName,
      request: request,
    });
  } else {
    console.log("Request Not Found");
    res.redirect("/admin/manage-accounts/view/partners");
  }
};

registerController.acceptPartnerRequest = async (req, res) => {
  const requestId = req.params.id;
  if (requestId) {
    const request = await PartnershipRequests.findById(requestId);
    if (request) {
      if (request.imageName) {
        upload(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.error(err);
            res.render("admin/accountManagement/register/partnershipRequest", {
              errorMessage: "Error uploading image",
              user: req.userName,
              title: "Accept Request",
            });
          } else if (err) {
            // An unknown error occurred when uploading.
            console.error(err);
            res.render("admin/accountManagement/register/partnershipRequest", {
              errorMessage: "Error uploading image",
              user: req.userName,
              title: "Accept Request",
            });
          }
        });
      }
      const partner = new Partner({
        name: request.name,
        email: request.email,
        description: request.description,
        dateOfRegistry: Date.now(),
        numberOfDonations: 0,
        password: request.password,
        imageName: request.imageName,
      });
      try {
        await partner.save();
        await request.updateOne({ accepted: true });
        res.redirect(`/admin/manage-accounts/view/partners`);
      } catch (error) {
        console.error(error);
        res.render("admin/accountManagement/register/partnershipRequest", {
          title: "Accept Partner",
          errorMessage: "Error creating partner",
          title: "Register Partner",
          user: req.userName,
          request:request
        });
      }
    } else if (!request) {
      res.render("admin/accountManagement/register/partnershipRequest", {
        title: "Accept Partner",
        errorMessage: "Request not found!",
        title: "Accept Request",
        user: req.userName,
      });
    }
  }
};

module.exports = registerController;
