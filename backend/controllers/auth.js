const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/auth");
emailRegexp=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation } = req.body;
  let errors = {name: null,password: null,password_confirmation: null,match: null,user: null};
  
  if (!name) {
    errors["name"]="required";
  }
  if (!email) {
    errors["email"]="required";
  }
  if (!emailRegexp.test(email)) {
    errors["email"]="invalid";
  }
  if (!password) {
    errors["password"]="required";
  }
  if (!password_confirmation) {
    errors["password_confirmation"]="required";
  }
  if (password != password_confirmation) {
    errors["match"]="password not matching"
  }
  if (errors["email"] || errors["password"] || errors["password_confirmation"] || errors["name"] || errors["match"]) {
    return res.status(401).json({ errors: errors });
  }
 User.findOne({email: email})
    .then(user=>{
       if(user){
          return res.status(401).json({ errors: { user: "email already exists" } });
       }else {
         const user = new User({
           name: name,
           email: email,
           password: password,
         });
 bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}
exports.signin = (req, res) => {
     let { email, password } = req.body;
     let errors = {email: null,password: null,user: null,jwt: null};
     if (!email) {
       errors["email"]="invalid email";
     }
     if (!emailRegexp.test(email)) {
       errors["email"]="invalid email";
     }
     if (!password) {
       errors["password"]="enter password";
     }
     if (errors["email"] || errors["password"]) {
      return res.status(401).json({ errors: errors });
     }
     User.findOne({ email: email }).then(user => {
        if (!user) {
          errors["user"]="User not found";
          return res.status(401).json({
            errors: {user: "User not found"},
          });
        } else {
           bcrypt.compare(password, user.password,function(err,isMatch) {
              if (!isMatch) {
               return res.status(401).json({ errors: { password:"Incorrect password" } 
               });
              }
       let access_token = createJWT(
          user.email,
          user._id,
          3600
       );
       
       jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
decoded) => {
         if (err) {
            res.status(401).json({ errors: {jwt: "TOKEN ERROR"} });
         }
         if (decoded) {
             return res.status(200).json({
                success: true,
                token: access_token,
                message: user
             });
           }
         });
        });
      
        }
   }).catch(err => {
      res.status(401).json({ errors: err });
   });
}