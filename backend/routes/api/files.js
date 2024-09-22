const fileUploaderController = require('../../controllers/api/fileUpload')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/file', function(req, res) {
  res.render('fileForm');
});

/* GET home page. */
router.get('/file_and_data', function(req, res) {
  res.render('fileAndDataForm');
});

router.post('/file_upload', function(req, res) {
  fileUploaderController.getSingleFile(req,res);
});

router.post('/file_and_data_upload', function(req, res) {
  fileUploaderController.getFileAndRestData(req,res);
});

module.exports = router;
