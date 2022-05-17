const express = require('express');
var router = express.Router();

const User = require('../models/user.model');

router.post('/signup', function(req, res)
{
  console.log("req.body", req.body);
  User
  .findOne({ Email: req.body.Email})
  .then(fetchedUser => 
  {
    if(fetchedUser)
    {
      res.status(400).send({ message: "Email is already in use"})
    }
    else
    {
      new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password,
        DOB: req.body.DOB,
        Role: req.body.Role,
      })
      .save()
      .then(savedUser =>
      {
        res.send({ message: "User was registerd successfully."})
      })
      .catch(error =>
      {
        res.status(500).send({ message: error})
        return;
      })
    }
  })
  .catch(error =>
  {
    res.status(500).send({ message: error})
    return;
  })
})

router.post('/signin', function(req, res)
{

  console.log("dsd", req.body);

  User
  .findOne({ 
    // $and: [
    //   { Email: req.body.Email },
    //   { Password: req.body.Password },
    // ]
    Email: req.body.Email,
    Password: req.body.Password
  })
  .then(fetchedUser => 
  {
    console.log("fetchedUser", fetchedUser);
    if(!fetchedUser)
    {
      res.status(404).send({ message: 'User Not Found. admin@123'})
    }
    else
    {
      res.status(200).send({ data: fetchedUser})
    }
    
  })
  .catch(error =>
  {
    res.status(500).send({ message: error})
    return;
  })
})

module.exports = router;