//import our libraries and set up express
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require('dotenv').config();
const Recaptcha = require("express-recaptcha").RecaptchaV2;
const mailgun = require("mailgun-js");
const {check, validationResult} = require("express-validator");

const validation = [
    check("name", "A valid name is required.").not().isEmpty().trim().escape(),
    check("email", "Please provide a valid email address.").isEmail(),
    check("purpose").optional().trim().escape(),
    check("message", "A message shorter than 2,000 characters is required.").trim().escape().isLength({min: 1, max:2000})
];

const app = express();
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY);
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});


//bring middle-ware into express
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const indexRoute = express.Router();

const handleGetRequest = (req, res) => {
    return res.json("The express server is live.");
}

const handlePostRequest = (req, res, nextFunction) => {
    res.append("Content-Type", "text/html")
    console.log(req.body);
    // if(request.recaptcha.error) {
    //     return send(`<div class="alert alert-danger" role='alert'><strong>There was an error with recaptcha!</strong></div>`)
    // }

    const errors = validationResult(req)

    if(errors.isEmpty() === false) {
        const currentError = errors.array()[0]
        return res.send(`<div class="alert alert.danger" role'alert'><strong>$currentError.msg}</strong></div>`)
    }

    const {email, name, purpose, message} = req.body;
    const mailgunData = {
        to: process.env.MAIL_RECIPIENT,
        from: `${name} <postmaster@${process.env.MAILGUN_API_KEY}>`,
        subject: `${email}: ${purpose}`,
        text: `${message}`
    }

    mg.messages().send(mailgunData, () => {
        if(error) {
            return response.send(Buffer.from(`<div class='alert alert-danger' role='alert'>Unable to send email!</div>`))
        }
    });
}

indexRoute.route("/")
    .get(handleGetRequest)
    .post(recaptcha.middleware.verify, validation, handlePostRequest);

app.use("/apis", indexRoute);

app.listen(4200, () => {
    console.log("Express successfully built.")
});