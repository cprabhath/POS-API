// Used for user registration and login

//-----------------Importing Packages----------------//
const UserSchema = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
//---------------------------------------------------//

//-----------------Global Variables----------------//
const salt = 10;
//-------------------------------------------------//

//------------------User Register----------------//
const register = (req, res) => {
  // Checking email already exists
  UserSchema.findOne({ email: req.body.email }).then((user) => {
    if (user !== null) {
      res.status(409).json({
        message: "Email already exists",
      });
    } else {
      // Hashing Password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          const user = new UserSchema({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash,
            activeState: req.body.activeState,
          });
          // Email configuration
          const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
              user: "your email",
              pass: "your password",
            },
          });
          // Email Content
          const mailOptions = {
            from: "librarylkactivation@gmail.com",
            to: req.body.email,
            subject: "Account Activation Link",
            text: "<h1>You have Created your account</h1>",
          };
          // Sending Email
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              res.status(500).json({
                message: err.message,
              });
            } else {
              // Saving User
              user
                .save()
                .then((result) => {
                  res.status(201).json({
                    message: "User created",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: err.message,
                  });
                });
            }
          });
        }
      });
    }
  });
};
//----------------------------------------------//

//------------------User Login------------------//
const login = (req, res) => {
  // Checking email exists
  UserSchema.findOne({ email: req.body.email }).then((selectedUser) => {
    if (selectedUser === null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      // Comparing Password
      bcrypt.compare(
        req.body.password,
        selectedUser.password,
        (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Authentication failed",
            });
          } else {
            if (result) {
              // Creating Token
              const payload = {
                email: selectedUser.email,
                userId: selectedUser._id,
              };

              const secretKey = process.env.SECRET_KEY;
              const expiresIn = "24h";
              const token = jwt.sign(payload, secretKey, {
                expiresIn: expiresIn,
              });
              // Sending Token
              res.status(200).json({
                message: "Authentication successful",
                token: token,
              });
            } else {
              res.status(401).json({
                message: "Password Incorrect ",
              });
            }
          }
        }
      );
    }
  });
};
//----------------------------------------------//

//------------------Exporting modules--------------------//
module.exports = {
  register,
  login,
};
//------------------------------------------------------//
