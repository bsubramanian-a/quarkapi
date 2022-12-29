const UserService = require("../services/UserService");
const Util = require('../utils/Utils');
const bcrypt = require('bcrypt');
const database = require('../src/models');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const e = require("express");
const twilio = require('twilio');

const twillio_accountSid = process.env.TWILLIO_SID;
const twillio_authToken = process.env.TWILLIO_TOKEN;
const twillio_phone = process.env.TWILLIO_PHONE;

const client = new twilio(twillio_accountSid, twillio_authToken);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crtvecode@gmail.com',
    pass: 'sbyvkjdckqtosuhm'
  }
});

const util = new Util();

const createUser = async (req, res) => {
  const url = req.get('host');

  try {
    const { email, password, type, firstname, lastname } = req.body;
    const otp = Math.floor(Math.random() * 10000000);
    const data = {
      email,
      password: bcrypt.hashSync(password, 10),
      user_type: type,
      firstname,
      lastname,
      otp
    }
    const user = await database.User.findOne({where: {email:email}});
    if(user){
      return res.status(200).send({
        status: 409,
        message: "Account already exist, please login to proceed" 
      });
    }else{
      const newUser = await database.User.create(data);
      if (newUser) {
        let token = jwt.sign({id: newUser.id}, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("newUser", JSON.stringify(newUser, null, 2));
        console.log(token);
  
        const mailOptions = {
          from: 'crtvecode@gmail.com',
          to: email,
          subject: 'Login Credentials',
          html: `<p>Click the link to verify your account : <a href="http://${url}/api/v1/users/verify-user/${email}/${otp}">${url}/api/v1/users/verify-user/${email}/${otp}</a></p>`
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).send({
              status: 200,
              message: "Registration successfull, please check your email to verify!" 
            });
          }
        });
      } else {
        return res.status(200).send({
          status: 409,
          message: "Account already exist, please login to proceed" 
        });
      }
    }
  } catch (error) {
    //console.log(error)
    return res.status(409).send({
      status:409
    });
  }
};

const updateUser = async (req, res) => {
  console.log("update user");
  try {
    let user_id = req.userId;
    const { email, firstname, lastname } = req.body;
    const otp = Math.floor(Math.random() * 10000000);
    const data = {
      email,
      firstname,
      lastname,
      otp
    }

    const user = await database.User.findOne({where: {id:user_id}});
    if (user) {
       if(user.id == user_id){
            const update_user = await database.User.update(
                data,
                {where:{id: user_id}}
            );
            if (update_user) {
                return res.status(200).send("User updated")
            }else{
              return res.status(403).send("Please try again")
            }
        }else{
            return res.status(403).send("No access");
        }
    } else {
      return res.status(409).send({
        status: 409 
      });
    }
  } catch (error) {
    //console.log(error)
    return res.status(409).send({
      status:409
    });
  }
};

const verifyUser = async (req, res) => {
  try{
    const { email, token } = req.params;
    console.log("email", email);
    const user = await database.User.findOne({where: {email}});
    if(user.is_verified){
      return res.redirect(process.env.WEB_URL);
    }else{
      if(user.otp == token){
        await database.User.update(
          {otp: null, is_verified: 1},
          {where:{id:user.id}}
        );
        return res.redirect(process.env.WEB_URL+'/verify-user?verified=true');
      }else{
        return res.redirect(process.env.WEB_URL+'/verify-user?verified=false');
      }
    }
  }catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const userAvatar = async (req, res) => {
  const fs = require('fs');
  let user_id = req.userId;
  const user = await database.User.findOne({where: {id:user_id}});

  if(user.avatar){
    try {
      fs.unlinkSync('public/images/'+user.avatar);
      console.log('successfully deleted');
    } catch (err) {
      // handle the error
      return res.status(400).send(err);
    }
  }
  try{
    if(req.file){
      const upload = await database.User.update(
        {avatar:req.file.filename},
        {where:{id: user_id}}
      );
      
      if(upload == 1){
        return res.status(200).send({
          status: "success",
        });
      }else{
        return res.status(403).send({
          status: "Please try again",
        });
      }
    }else{
      return res.status(403).send({
        status: "Please select an image"
      });
    }
  }catch (error) {
    return res.status(403).send({
        status: error
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await database.User.findOne({where: {email}});

    if (user) {
      if(user.is_verified){
        const isPasswordSame = await bcrypt.compareSync(password, user.password);      
        if (isPasswordSame) {        
          let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });
          res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
  
          return res.status(201).send({
            status: 200,
            user,
            token 
          });
        } else {
          return res.status(401).send({
            status:409,
            message: "Credentials are not correct" 
          });
        }
      }else{
        return res.status(401).send({
          status:409,
          message: "Please verify your email to proceed" 
        });
      }
    } else {
      return res.status(401).send({
        status:409,
        message: "Email does not exist." 
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const getAllUsers = async (req, res) => {
  try {

    const users = await database.User.findAll();
    return res.status(401).send(users);

    // const allUsers = await UserService.getAllUsers();
    // if (allUsers.length > 0) {
    //   util.setSuccess(200, 'Users retrieved', allUsers);
    // } else {
    //   util.setSuccess(200, 'No user found');
    // }
    //return util.send(res);
  } catch (error) {
    util.setError(400, error);
    return util.send(res);
  }
}

const changePassword = async (req, res) => {
  try {
    let user_id = req.userId;
    const user = await database.User.findOne({where: {id:user_id}});
    const { currentpassword, newpassword } = req.body;

    if (user) {
      const isPasswordSame = await bcrypt.compareSync(currentpassword, user.password);      
      if (isPasswordSame) {
        const password_update = await database.User.update(
          {password: await bcrypt.hashSync(newpassword, 10)},
          {where:{id:user.id}}
        );
        if (password_update) {
          const mailOptions = {
            from: 'crtvecode@gmail.com',
            to: user.email,
            subject: 'Your New Password Updated Successfully',
            text: `Your new Password : ${newpassword}`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).send({
                status: "success" 
              });
            }
          });
        } else {
          return res.status(401).send({
            status: "New Password update error." 
          }); 
        }
      } else {
        return res.status(401).send({
          status: "Old password is not correct." 
        }); 
      }
    } else {
      return res.status(401).send({
        status: "Email does not exist." 
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const forgetPassword = async (req, res) => {  
  console.log("forget-password")
  try {
    const { email } = req.body;
    const user = await database.User.findOne({where: {email}});

    if (user) {
      const otp_to_forget = Math.floor(100000 + Math.random() * 900000);
        
      const update_otp_forget = await database.User.update(
        {otp: otp_to_forget},
        {where:{id:user.id}}
      );

      console.log("web url", process.env.WEB_URL);

      if (update_otp_forget) {
        const mailOptions = {
          from: 'crtvecode@gmail.com',
          to: email,
          subject: 'Forgot Password',
          html: `<p>Click the link to change password : <a href="${process.env.WEB_URL}/reset-password?email=${email}&token=${otp_to_forget}">${process.env.WEB_URL}?email=${email}&token=${otp_to_forget}</a></p>`
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(201).send({
              status: "success" 
            });
            // do something useful
          }
        });
      } else {
        return res.status(401).send({
          status: "OTP error" 
        });
      }
    } else {
      return res.status(401).send({
        status: "Email does not exist." 
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const resetPassword = async (req, res) => {  
  try {
    const { email, otp, password } = req.body;
    const user = await database.User.findOne({where: {email}});
    if(user.otp == otp){
      if (user) {
        const password_update = await database.User.update(
          {password: await bcrypt.hashSync(password, 10), otp: null},
          {where:{id:user.id}}
        );
        if (password_update) {
          const mailOptions = {
            from: 'crtvecode@gmail.com',
            to: user.email,
            subject: 'Your New Password Updated Successfully',
            text: `Your new Password : ${password}`
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).send({
                status: "success" 
              });
            }
          });
        } else {
          return res.status(401).send({
            status: "New Password update error." 
          }); 
        }
      } else {
        return res.status(401).send({
          status: "Email does not exist." 
        });
      }
    }else{
      return res.status(401).send({
        status: "Token invalid, please try again!" 
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const verifyEmail = async (req, res) => {  
  console.log("forget-password")
  try {
    const { email } = req.body;
    const user = await database.User.findOne({where: {email}});

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000);
        
      const update_otp_forget = await database.User.update(
        {otp: otp},
        {where:{id:user.id}}
      );

      console.log("web url", process.env.WEB_URL);

      if (update_otp_forget) {
        const url = req.get('host');
        const mailOptions = {
          from: 'crtvecode@gmail.com',
          to: email,
          subject: 'Login Credentials',
          html: `<p>Click the link to verify your account : <a href="http://${url}/api/v1/users/verify-user/${email}/${otp}">${url}/api/v1/users/verify-user/${email}/${otp}</a></p>`
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(201).send({
              status: "success" 
            });
            // do something useful
          }
        });
      } else {
        return res.status(401).send({
          status: "OTP error" 
        });
      }
    } else {
      return res.status(401).send({
        status: "Email does not exist." 
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const sendOtpLogin = async(phone, otp) => {
  return new Promise((resolve, reject) => {
    client.messages
    .create({
      body: `Please use this otp ${otp} to login.`,
      to: phone,
      from: twillio_phone,
    })
    .then((message) => {
      resolve(true);
    }).catch(err => {
      console.log("error twillio", err.message);
      resolve(err.message);
    });
  })
}

const resendLoginOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await database.User.findOne({where: {phone_number:phone}});
    const otp = Math.floor(1000 + Math.random() * 9000);
    if(user){
      const update_otp = await database.User.update(
        {otp: otp},
        {where:{id:user.id}}
      );
      
      if(update_otp){
        const sentMsg = await sendOtpLogin(phone, otp);
        if(sentMsg == true){
          return res.status(200).send({
            status: 200,
            message: "An sms with otp has been sent to your number." 
          });
        }else{
          return res.status(401).send({
            status: 401,
            message: sentMsg 
          });
        }
      }else {
        return res.status(401).send({
          status: 401,
          message: "OTP error" 
        });
      }
    }else{
      return res.status(401).send({
        status: 401,
        message: "Please create an account to proceed"
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const loginWithOTP = async (req, res) => {
  try {
    const { phone, user_type } = req.body;
    const user = await database.User.findOne({where: {phone_number:phone}});
    const otp = Math.floor(1000 + Math.random() * 9000);
    if(user){
      const update_otp = await database.User.update(
        {otp: otp},
        {where:{id:user.id}}
      );
      
      if(update_otp){
        const sentMsg = await sendOtpLogin(phone, otp);
        if(sentMsg == true){
          return res.status(200).send({
            status: "An sms with otp has been sent to your number." 
          });
        }else{
          return res.status(401).send({
            status: sentMsg 
          });
        }
      }else {
        return res.status(401).send({
          status: "OTP error" 
        });
      }
    }else{
      const data = {
        user_type: user_type,
        phone_number: phone
      }
  
      const newUser = await database.User.create(data);
      console.log("newUser",newUser);
      if (newUser) {
        const update_otp = await database.User.update(
          {otp: otp},
          {where:{id:newUser.id}}
        );
        
        if(update_otp){
          const sentMsg = await sendOtpLogin(phone, otp);
          if(sentMsg == true){
            return res.status(200).send({
              message: "An sms with otp has been sent to your number.",
              status: 200, 
            });
          }else{
            return res.status(401).send({
              message: sentMsg,
              status: 401, 
            });
          }
        }else {
          return res.status(401).send({
            message: "OTP error",
            status: 401,
          });
        }
      }else{
        return res.status(401).send({
          message: "something went wrong, please try again",
          status: 401
        });
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const verifyLoginOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const user = await database.User.findOne({where: {phone_number:phone}});

    if(user){
      if(user.otp == otp){
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

        return res.status(201).send({
          message: 'Successfully verified',
          user,
          token,
          status: 200
        });
      }else {
        return res.status(401).send({
          message: "OTP not valid",
          status: 401
        });
      }
    }else{
      return res.status(401).send({
        message: "No user found, please register",
        status: 401
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({
      message: error,
      status: 401 
    });
  }
}

module.exports = { createUser, getAllUsers, verifyUser, loginUser, userAvatar, updateUser, changePassword, forgetPassword, resetPassword, verifyEmail, loginWithOTP, verifyLoginOTP, resendLoginOtp };