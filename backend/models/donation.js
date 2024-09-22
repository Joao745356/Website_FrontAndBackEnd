const mongoose = require("mongoose");
const donationImagePath = "uploads/donations";
const path = require("path");

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Donor",
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Partner",
  },

  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "CollectionPoint",
  },

  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be less than 0'], // Set minimum value to 0
    max: [100, 'Quantity cannot be more than 100'] // Set maximum value to 100
  },
  quality: {
    type: String,
    enum: {
      values: ["Excellent", "Good", "Fair", "Poor"],
    },
  },
  pointsAwarded: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  imageName: {
    type: String,
  },
  state: {
    type: String,
    enum: {
      values: ["Waiting", "Sent", "Received", "Forwarded"],
    },
    default: "Sent",
  },
});

// Populate the donor's email when querying donations
donationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "donor",
    select: "email", // Populate only the 'email' field of the donor
  });
  next();
});

donationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "institution",
    select: "name",
  });
  next();
});

donationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "location",
    select: "name",
  });
  next();
});

donationSchema.virtual("imagePath").get(function () {
  if (this.imageName != null) {
    return path.join("/", donationImagePath, this.imageName);
  }
});

module.exports = mongoose.model("Donation", donationSchema);

module.exports.donationImagePath = donationImagePath;
