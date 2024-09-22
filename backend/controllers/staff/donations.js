const Donation = require("../../models/donation");
const DonationRequest = require("../../models/donationRequests");
const Donor = require("../../models/donor");
const Reward = require("../../models/reward");
const Partner = require("../../models/partner");
const CollectionPoint = require("../../models/collectionPoint");

donationController = {};
const multer = require("multer");
const path = require("path");

const uploadPath = path.join("public", Donation.donationImagePath);
const imageMimeTypes = ["image/jpeg", "image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); // Appending .jpg
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
}).single("image");
donationController.home = (req, res) => {
  res.render("staff/dashboard.ejs", {
    title: "Staff Homepage",
    user: req.userName,
  });
};

donationController.newDonationForm = (req, res) => {
  renderNewPage(
    req,
    res,
    new Donation(),
    "staff/donationManagement/registerDonation"
  );
};

donationController.viewDonations = async (req, res) => {
  let donations = await Donation.find();
  res.render("staff/donationManagement/donationHistory", {
    donations: donations,
    title: "Donation History",
    user: req.userName,
  });
};

donationController.newDonation = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error(err);
      res.render("staff/donationManagement/registerDonation", {
        errorMessage: "Error uploading image",
        user: req.userName,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error(err);
      res.render("staff/donationManagement/registerDonation", {
        errorMessage: "Unknown error uploading image",
        user: req.userName,
      });
    }

    pointsAwardedDonation = await pointsAwardedDonation(req);
    const filename = req.file ? req.file.filename : null;

    const donation = new Donation({
      donor: req.body.donor,
      location: req.body.location,
      quantity: req.body.quantity,
      date: req.body.date,
      pointsAwarded: pointsAwardedDonation,
      quality: req.body.quality,
      institution: req.body.institution,
      imageName: filename,
      state: "Sent",
    });

    await Donor.findByIdAndUpdate(req.donor, {
      $inc: { pointsEarned: pointsAwardedDonation },
    });
    await CollectionPoint.findByIdAndUpdate(req.location, {
      $inc: { numberOfDonationsProcessed: 1 },
    });

    await Partner.findByIdAndUpdate(req.institution, {
      $inc:{numberOfDonations: 1}
    })

    try {
      await donation.save();
      if (req.params.id) {
        const request = await DonationRequest.findById(req.params.id);
        if (request) {
          await DonationRequest.findByIdAndDelete(request.id);
        }
      }

      res.redirect("/staff/viewDonations");
    } catch (error) {
      console.error(error);
      res.render("/staff/donationManagement/registerDonation", {
        donation: donation,
        errorMessage: "Error creating Donation",
        user: req.userName,
      });
    }
  });
};

async function renderNewPage(req, res, donation, page, hasError = false) {
  try {
    const donors = await Donor.find({});
    const partners = await Partner.find({});
    const locations = await CollectionPoint.find({});
    const params = {
      donors: donors,
      request: donation,
      collectionPoints: locations,
      title: "Register Donation",
      partners: partners,
      user: req.userName,
      donation:donation
    };
    if (hasError) params.errorMessage = "Error Creating Donation";
    res.render(page, params);
  } catch (err) {
    res.redirect("/staff");
    console.log(err);
  }
}

async function pointsAwardedDonation(req) {
  let pointsAwarded = 0;
  let percentageOfPoints = 1;

  const reward = await Reward.findOne();
  if (req.body.quantity >= reward.baseQuantity) {
    switch (req.body.quality) {
      case "Fair":
        percentageOfPoints = reward.fairPercentage / 100;
        break;
      case "Excellent":
        percentageOfPoints = reward.excellentPercentage / 100;
        break;
      case "Good":
        percentageOfPoints = reward.goodPercentage / 100;
        break;
      case "Poor":
        percentageOfPoints = reward.poorPercentage / 100;
        break;
    }
    let points = reward.points * percentageOfPoints;
    pointsAwarded =
      Math.floor(req.body.quantity / reward.baseQuantity) * points;
    return pointsAwarded;
  } else {
    return 0;
  }
}

async function pointsAwardedRequest(request) {
  let pointsAwarded = 0;
  let percentageOfPoints = 1;

  const reward = await Reward.findOne();
  if (request.quantity >= reward.baseQuantity) {
    switch (request.quality) {
      case "Fair":
        percentageOfPoints = reward.fairPercentage / 100;
        break;
      case "Excellent":
        percentageOfPoints = reward.excellentPercentage / 100;
        break;
      case "Good":
        percentageOfPoints = reward.goodPercentage / 100;
        break;
      case "Poor":
        percentageOfPoints = reward.poorPercentage / 100;
        break;
    }
    let points = reward.points * percentageOfPoints;
    pointsAwarded =
      Math.floor(request.quantity / reward.baseQuantity) * points;
    return pointsAwarded;
  } else {
    return 0;
  }
}


donationController.viewDonationRequests = async (req, res) => {
  try {
    const requests = await DonationRequest.find();
    res.render("staff/donationManagement/donationRequests", {
      requests: requests,
      title: "Donation requests",
      user: req.userName,
    });
  } catch {
    res.redirect("/");
  }
};

donationController.viewDonationRequest = async (req, res) => {
  const requestId = req.params.id;
  if (requestId) {
    const request = await DonationRequest.findById(requestId);
    renderNewPage(
      req,
      res,
      request,
      "staff/donationManagement/donationRequest"
    );
  } else {
    console.log("Request Not Found");
    res.redirect("/staff/viewDonations");
  }
};

donationController.deleteRequest = async (req, res) => {
  let request;
  try {
    request = await DonationRequest.findByIdAndDelete(req.params.id);
    res.redirect("/staff/donationRequests")
  } catch (err) {
    if (request == null) {
      renderNewPage(req, res, request, 'staff/donationRequest', hasError = true)
    } else {
      renderNewPage(req, res, request, 'staff/donationRequest', hasError = true)
    }
    console.log(err);
  }
};

donationController.acceptRequest = async (req, res) => {
  const requestID = req.params.id;
  let request;
  if (requestID) {
    request = await DonationRequest.findById(requestID);

  if (request) {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error(err);
        renderNewPage(req, res, request, 'staff/donationRequest', hasError = true)
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error(err);
        renderNewPage(req, res, request, 'staff/donationRequest', hasError = true)
      }
    });

    let pointsAwardedDonation = await pointsAwardedRequest(request);
    const filename = req.file ? req.file.filename : null;
    const donation = new Donation({
      donor: request.donor,
      location: request.location,
      quantity: request.quantity,
      date: request.date,
      pointsAwarded: pointsAwardedDonation,
      quality: request.quality,
      institution: request.institution,
      imageName: filename,
      date: req.body.date,
      state: "Sent",
    });

    await Donor.findByIdAndUpdate(request.donor, {
      $inc: { pointsEarned: pointsAwardedDonation },
    });
    await CollectionPoint.findByIdAndUpdate(request.location, {
      $inc: { numberOfDonationsProcessed: 1 },
    });

    await Partner.findByIdAndUpdate(request.institution, {
      $inc:{numberOfDonations: 1}
    })

    try {
      await donation.save();
      await DonationRequest.findByIdAndUpdate(request.id, {state:'Sent'});
      res.redirect("/staff/viewDonations");
    } catch (error) {
      console.error(error);
      renderNewPage(req, res, request, 'staff/donationRequest', hasError = true)
    }
  }
}
};

module.exports = donationController;
