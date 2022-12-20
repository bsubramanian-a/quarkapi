const UserService = require("../services/UserService");
const Util = require('../utils/Utils');
const bcrypt = require('bcrypt');
const database = require('../src/models');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

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
        html: `Click the link to verify your account : <a>${url}/api/v1/users/verify-user?email=${email}&token=${otp}</a>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(201).send({
            status: "success" 
          });
        }
      });
    } else {
      return res.status(409).send({
        status: "error" 
      });
    }
  } catch (error) {
    //console.log(error)
    return res.status(409).send({
      status: "error" + error
    });
  }
};

const verifyUser = async (req, res) => {
  try{
    const { email, token } = req.query;
    const user = await database.User.findOne({where: {email}});
    if(user.otp == token){
      await database.User.update(
        {otp: null, is_verified: 1},
        {where:{id:user.id}}
      );
      return res.status(401).send({
        status: "successfully verified" 
      });
    }else{
      return res.status(401).send({
        status: "verification failed, please try again" 
      });
    }
  }catch (error) {
    console.log(error)
    return res.status(401).send({
      status: "error" 
    });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await database.User.findOne({where: {email}});

    if (user) {
      const isPasswordSame = await bcrypt.compareSync(password, user.password);      
      if (isPasswordSame) {        
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

        return res.status(201).send({
          status: "success",
          user,
          token 
        });
      } else {
        return res.status(401).send({
          status: "Password not correct" 
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

module.exports = { createUser, getAllUsers, verifyUser, loginUser };