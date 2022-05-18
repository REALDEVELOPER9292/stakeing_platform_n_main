const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
var cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/projects';
var db = mongoose.connection;
var Schema = mongoose.Schema;
var schema = new Schema(
  {
    name: String,
    symbol: String,
    price: Number,
    logo: String,
    presaleRate: Number,
    listingRate: Number,
    whitelist: String,
    softcap: Number,
    hardcap: Number,
    refundType: String,
    minBNB: Number,
    maxBNB: Number,
    liqPercent: Number,
    liqLockTime: Number,
    website: String,
    description: String,
    facebook: String,
    twitter: String,
    github: String,
    telegram: String,
    instagram: String,
    discord: String,
    reddit: String,
    startTime: Date,
    endTime: Date,
    address: String,
    tier: Number
  })
var ProjectModel = mongoose.model('projects', schema );

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const saveProject = (req, res) => {
  const {
      name,
      symbol,
      price,
      logo,
      presaleRate,
      listingRate,
      whitelist,
      softcap,
      hardcap,
      refundType,
      minBNB,
      maxBNB,
      liqPercent,
      liqLockTime,
      website,
      description,
      facebook,
      twitter,
      github,
      telegram,
      instagram,
      discord,
      reddit,
      startTime,
      endTime,
      address,
      tier} = req.body;

  ProjectModel.create({
      name : name,
      symbol : symbol,
      price: price,
      logo: logo,
      presaleRate : presaleRate,
      listingRate : listingRate,
      whitelist : whitelist,
      softcap : softcap,
      hardcap : hardcap,
      refundType : refundType,
      minBNB : minBNB,
      maxBNB : maxBNB,
      liqPercent : liqPercent,
      liqLockTime : liqLockTime,
      website : website,
      description : description,
      facebook : facebook,
      twitter : twitter,
      github : github,
      telegram : telegram,
      instagram : instagram,
      discord : discord,
      reddit : reddit,
      startTime: startTime,
      endTime: endTime,
      address: address,
      tier: tier
  }, function (err, newProject) {
  if (err) console.log(err);
  else res.send("successfully saved")
  });
}

const fetchProjects = (req, res) => {
  ProjectModel.find().exec((err, projects) => {
    if (err) console.log(err)
    else {
      res.send(projects)
    }
  })
}

app.post('/saveproject', saveProject);
app.get('/fetchProjects', fetchProjects);

app.listen(port, function() {
  console.log(`app listening on port ${port}!`)
});
