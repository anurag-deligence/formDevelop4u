const express = require("express");
const router = express.Router();
const multer = require("multer");
const PD = require("../operations/projectOperation");
const async = require("async");
const nodemail = require("../operations/nodemails")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'developform/src/assets/images/')
  },
  filename: function (req, file, cb) {
    console.log("sd", file.originalname);
    cb(null, file.originalname);
  }
})

var upload = multer({ storage: storage });

router.post('/details', upload.single('file'), (req, res, next) => {
  console.log("running..", req.file);
  var data = JSON.parse(req.body.data);
  console.log(data);
  var { projectType, budget, timeline, getStarted, locationPref, technologyPref, projectDetails, name, email, position, organization, location } = data;
  if (req.file !== undefined) {
    var newDetails = new PD({
      projectType, budget, timeline, getStarted, locationPref, technologyPref, projectDetails, name, email, position, organization, location, file: req.file.path, verify: false
    })
  }
  else {
    var newDetails = new PD({
      projectType, budget, timeline, getStarted, locationPref, technologyPref, projectDetails, name, email, position, organization, location, verify: false
    })
  }
  async.waterfall([
    (callback) => {
      newDetails.save(function (error, docs) {
        console.log("Your bee has been saved!");
        if (error)
          throw err
        else
          callback(error, docs)
      })
    },
    (docs, callback) => {
      nodemail.nodeMail(docs.email, (err, info) => {
        callback(err, info);
      })
    }
  ], async (err, result) => {
    if (err)
      await res.json(err)
    else
      await res.json({ status: true, msg: 'Mail Sent' });
  })
})


module.exports = router;