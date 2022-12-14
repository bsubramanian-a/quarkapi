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

const createCompany = async (req, res) => {
    let user_id = req.userId;
    // console.log("req data", req.userId)

    if(user_id){
        try {
            const { name, address, reg_no, trucks_owned, trucks_partnership, phone_number, md, md_phone, op, op_phone, overseas_agent, overseas_agent_phone, latitude, longitude } = req.body.data;
            const data = {
                name, user_id, address, reg_no, trucks_owned, trucks_partnership, phone_number, latitude, longitude, md, md_phone, op, op_phone, overseas_agent, overseas_agent_phone
            }

            // console.log("create data", data);
    
            const newCompany = await database.Company.create(data);
            if (newCompany) {
                return res.status(200).send({
                    message: "company created successfully",
                    status: 200,
                });
            } else {
                return res.status(409).send({
                    status: 409,
                    message: "something went wrong, please try again"
                });
            }
        } catch (error) {
            //console.log(error)
            return res.status(409).send({
                message: "error" + error,
                status: 409
            });
        }
    }else{
        return res.status(403).send({
            status: 403,
            message: "Please login to proceed",
        });
    }
  
};

const updateCompany = async (req, res) => {
    try {
        let user_id = req.userId;
        const { name, address, reg_no, trucks_owned, trucks_partnership, phone_number, md, md_phone, op, op_phone, overseas_agent, overseas_agent_phone, latitude, longitude, id } = req.body;

        const data = {
            name, address, reg_no, trucks_owned, trucks_partnership, phone_number, md, md_phone, op, op_phone, overseas_agent, overseas_agent_phone, latitude, longitude, user_id
        }

        const company = await database.Company.findOne({where: {id:id}});

        if (company) {
            if(company.user_id == user_id){
                const update_company = await database.Company.update(
                    data,
                    {where:{id: id}}
                    );
                    if (update_company) {
                        return res.status(200).send("Company updated")
                    }
            }else{
                return res.status(403).send("No access");
            }
        } else {
            return res.status(401).send("User does not exist.");
        }
    } catch (error) {
      console.log(error)
    }
  };

  const getCompany = async (req, res) => {
    try {
        let user_id = req.userId;

        const company = await database.Company.findOne({where: {user_id}});

        if (company) {
            return res.status(200).send({
                data: company,
                status: 200,
            });
        } else {
            return res.status(401).send("User does not have a company");
        }
    } catch (error) {
      console.log(error)
    }
  }

module.exports = { createCompany, updateCompany, getCompany };