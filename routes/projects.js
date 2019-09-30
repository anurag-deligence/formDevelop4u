const express = require("express");
const router = express.Router();
const multer = require("multer");
const PD = require("../operations/projectOperation");
const async = require("async");
const nodemail = require("../operations/nodemails");
const mongoose = require("mongoose");
const fs = require('fs');
const NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyA4mI-Wb-OWrtHlste2j8GbuFdD4CvzYbQ',
  formatter: null
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'developform/src/assets/images/')
  }
})

var upload = multer({ storage: storage });
router.post('/details', upload.single('file'), (req, res, next) => {
  var data = JSON.parse(req.body.data);
  if (req.file !== undefined) {
    data.filename = req.file.originalname;
    data.filepath = req.file.path;
  }

  async.waterfall([
    (callback) => {
      if (req.body.id == 'undefined') {
        var newDetails = new PD(data);
        newDetails.save(function (error, docs) {
          console.log("Your bee has been saved!", data);
          callback(error, docs)
        })
      }
      else {
        var id = { "_id": mongoose.Types.ObjectId(req.body.id) };
        PD.findById(id, async (err, data) => {
          if (err) { throw err }
          else {
            if (data.filepath !== undefined)
              await fs.unlink(data.filepath, (err) => {
                if (err) throw err;
                console.log('File was deleted');
              });
          }
        })
        PD.findByIdAndUpdate(id, data, { safe: true, upsert: true, new: true }, (err, docs) => {
          callback(err, docs);
        });
      }
    },
    (docs, callback) => {
      nodemail.nodeMail(docs, (err, info) => {
        callback(err, info);
      })
    }
  ], async (err, result) => {
    if (err)
      await res.json({ status: false, msg: err })
    else
      await res.json({ status: true, msg: 'Mail Sent' });
  })
})

router.get('/getlisted', (req, res, next) => {
  PD.find({}, (err, docs) => {
    if (err)
      res.json({ status: false, msg: err })
    else
      res.json({ status: true, msg: docs })
  })
})

router.post('/deleteDetail', (req, res, next) => {
  PD.findOneAndDelete({ _id: req.body.id }, (err, docs) => {
    if (err)
      res.json({ status: false, msg: err })
    else {
      fs.unlink(docs.filepath, (err) => {
        if (err) throw err;
        console.log('File was deleted');
      });
      res.json({ status: true, msg: docs })
    }
  })
})

var geocoder = NodeGeocoder(options);
router.get('/getMap', (req, res, next) => {
  geocoder.geocode('29 champs elysée paris', function (err, res) {
    if (err) { console.log(err) }
    else
      console.log(res);
  });

})

module.exports = router;