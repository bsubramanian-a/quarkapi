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



const createBooking = async (req, res) => {
    console.log("test", req.file);
    try{
        console.log("before", req.body);
    }catch (error) {
        return res.status(403).send({
            status: error
        });
    }
   
    // let user_id = req.userId;
    // if(user_id){
    //     try {
    //         const { booking_no, client_name, client_phone, no_of_trucks, client_address, date_of_booking, commodity_name, package_type, total_net_weight, truck_net_weight, cargo_hs_code, msds_file, loading_company_name, loading_company_rep, loading_company_clearance_agent, loading_hs_code, loading_address, loading_zip, loading_phone_number, loading_date, loading_lat, loading_lng, departure_company_name, departure_company_rep, departure_company_clearance_agent, departure_hs_code, departure_address, departure_zip, departure_phone_number, status, departure_lat, departure_lng } = req.body;
    //         const data = {
    //             booking_no, client_name, client_phone, no_of_trucks, client_address, date_of_booking, commodity_name, package_type, total_net_weight, truck_net_weight, cargo_hs_code, msds_file, loading_company_name, loading_company_rep, loading_company_clearance_agent, loading_hs_code, loading_address, loading_zip, loading_phone_number, loading_date, loading_lat, loading_lng, departure_company_name, departure_company_rep, departure_company_clearance_agent, departure_hs_code, departure_address, departure_zip, departure_phone_number, status, departure_lat, departure_lng, user_id
    //         }
    
    //         const newBooking = await database.Booking.create(data);
    //         if (newBooking) {
    //             return res.status(200).send({
    //                 status: "Booking successfull" 
    //             });
    //         } else {
    //             return res.status(409).send({
    //                 status: "something went wrong, please try again" 
    //             });
    //         }
    //     } catch (error) {
    //         //console.log(error)
    //         return res.status(409).send({
    //             status: "error" + error
    //         });
    //     }
    // }else{
    //     return res.status(403).send({
    //         status: "Please login to proceed"
    //     });
    // }
  
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

module.exports = { createBooking, updateCompany };