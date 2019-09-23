const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/developu", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
console.log("Database server at 27017");


var Schema = mongoose.Schema;
const PDSchema = new Schema({
  projectType: { type: String, required: true },
  budget: { type: String, required: true },
  timeline: { type: String, required: true },
  getStarted: { type: String, required: true },
  locationPref: { type: String },
  technologyPref: { type: String },
  projectDetails: { type: String, required: true },
  file: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: true },
  verify: { type: Boolean, required: true }

})

const PD = mongoose.model('ProjectDetails', PDSchema);
module.exports = PD;