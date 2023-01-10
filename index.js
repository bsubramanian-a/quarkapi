const config = require('dotenv').config
const express = require("express");
const cors = require('cors');

const bodyParser = require('body-parser')
const userRoutes = require("./api/server/routes/UserRoutes");
const companyRoutes = require("./api/server/routes/CompanyRoutes")
const bookingRoutes = require("./api/server/routes/BookingRoutes")
const TruckRoutes = require("./api/server/routes/TruckRoutes")

const app = express();
// var publicDir = require('path').join(__dirname,'/public'); 
// app.use(express.static(publicDir)); 
app.use("/public", express.static(require('path').join(__dirname, 'public')));
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedMiddleware = bodyParser.urlencoded({ extended: true });
var isMultipart = /^multipart\//i;
app.use(function (req, res, next) {
    var type = req.get('Content-Type');
    if (isMultipart.test(type)) return next();
    return urlencodedMiddleware(req, res, next);
});

const port = process.env.PORT || 8000;

app.use(express.urlencoded({
    extended: true
}));

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/trucks', TruckRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this API.'
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

module.exports = app;