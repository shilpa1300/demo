const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Admin Login
exports.signinforAdmin = (req, res) => {
  User.findOne({
    where: {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var token = jwt.sign({ id: user.id , name:user.userName }, 'secret', {
        expiresIn: 86400 // 24 hours
      });
        res.status(200).send({
          id: user.id,
          userName: user.userName,
          password: req.body.password,
          email: req.body.email,
          accessToken: token
        })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  })
};




// Customer Registration
exports.signup = (req, res) => {

  //console.log("hello");return false;
  // Save User to Database
  User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role : req.body.role
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};



// Customer Login
exports.signin = (req, res) => {
  User.findOne({
    where: {
      userName: req.body.userName
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id , name:user.userName }, 'secret', {
        expiresIn: 86400 // 24 hours
      });
        res.status(200).send({
          id: user.id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          accessToken: token
        });
    
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// get single profile

exports.getOneProfile = async (req, res) => {

  let id = req.params.id
  let user = await User.findOne({ where: { id: id }})
  res.status(200).send(user)

}

// update profile

exports.updateProfile = async (req, res) => {

  let id = req.params.id

  const user = await User.update(req.body, { where: { id: id }})
  
  res.status(200).send(user)
 

}

