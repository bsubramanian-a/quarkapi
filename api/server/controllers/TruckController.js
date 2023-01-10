const UserService = require("../services/UserService");
const Util = require('../utils/Utils');
const bcrypt = require('bcrypt');
const database = require('../src/models');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crtvecode@gmail.com',
    pass: 'sbyvkjdckqtosuhm'
  }
});

const twillio_accountSid = process.env.TWILLIO_SID;
const twillio_authToken = process.env.TWILLIO_TOKEN;
const twillio_phone = process.env.TWILLIO_PHONE;

const client = new twilio(twillio_accountSid, twillio_authToken);

const util = new Util();

const createTruck = async (req, res) => {
    // console.log("req1", req.files, req.body);
    let user_id = req.userId;

    if(user_id){
        const user = await database.User.findOne({where: {id:user_id}});
        console.log("user", user, user_id);
        try {
            const { truck_no, transit_no, driver_name, phone_number, dob, license_no, license_validity, id_no } = req.body;
            const data = {
                truck_no, transit_no, driver_name, phone_number, dob, license_no, license_validity, id_no, user_id
            }
    
            const newTruck = await database.Truck.create(data);
          
            if (newTruck) {
                if(req?.files?.length > 0){
                    let truck_id = newTruck.dataValues.id;
                    req?.files.forEach(async (file) => {
                        const data = {document: file.filename, truck_id, type: 'truck'}
                        const newDocument = await database.Document.create(data); 
                        // console.log("newdoc", newDocument);
                    });
                }

                client.messages
                    .create({
                        body: `${user.firstname} ${user.lastname} has invited you to register, please download the app using the following link and register. https://www.google.com`,
                        to: "+"+phone_number,
                        from: twillio_phone,
                    })
                        .then((message) => {
                        resolve(true);
                    }).catch(err => {
                        console.log("error twillio", err.message);
                        resolve(err.message);
                    });

                return res.status(200).send({
                    message: "Truck information added successfully",
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

const getTrucks = async (req, res) => {
    try {
        let user_id = req.userId;
        const url = 'http://' + req.get('host') + '/public/files/';
        database.Truck.findAll({where: {user_id}}).then(async trucks => {
            // console.log('trucks', trucks);
            const promises = trucks.map(async truck => {
                const documents = await database.Document.findAll({where: {truck_id: truck?.dataValues?.id}});
                truck.dataValues.documents = documents;
                truck.dataValues.fileUrl = url;
    
                return truck;
            });

            await Promise.all(promises)
            // console.log("promises..............", promises);

            return res.status(200).send({
                data: trucks,
                status: 200,
            });
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createTruck, updateCompany, getTrucks };