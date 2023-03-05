const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const profileModel =require("../models/profile");
//Routes has business logic and endpoint and intract with db

router.get("/login/:username/:password", async (req, res) => {
    try {
        const users = await userModel.find({userName: req.params.username, password: req.params.password})
        if(users && users[0]) {
          res.json({usersName: users[0].userName, email: users[0].email})
        } else {
          res.json({msg: "User Not Present. Please Signin"})
        }
      } catch (err) {
        res.status(500).json({message: err.message})
      }
}); 

router.post("/signup", async (req, res) => {
  try {
      //Check given username is already present or not
      const isExist = await userModel.find({userName: req.body.userName})
      if(isExist && isExist.length > 0) {
        res.status(200).json({msg: "User already present"})
      } else {
        const users = await userModel.collection.insertOne({userName: req.body.userName, password: req.body.password ,email:req.body.email})
        res.status(200).json(users)
      }
  } 
  catch (err) {
    res.status(500).json({message: err.message})
  }

});
router.post("/edit-profile", async (req, res) => {
  try {
      const isExist = await profileModel.find({userName: req.body.userName})
      if(isExist && isExist.length > 0) {
        delete isExist[0]['_id']
        let curData = isExist[0]
        var newData = { $set: req.body };
        const update = await profileModel.updateOne(curData, newData, function(err, res) {
        if (err) throw err;
          console.log("1 document updated");
        });
        res.json(update)
      } else {
        const profile = await profileModel.collection.insertOne({email:req.body.email, userName: req.body.userName, gender: req.body.gender, age: req.body.age, phoneNumber:req.body.phoneNumber, dob: req.body.dob})
        res.json(profile)
      }
  } 
  catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get("/read-profile/:username", async (req, res) => {
  try {
      const profile = await profileModel.find({userName: req.params.username, password: req.params.password})
      res.json(profile)
    } catch (err) {
      res.status(500).json({message: err.message})
    }
}); 


module.exports = router;