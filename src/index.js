//import our libraries and set up express
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require('dotenv').config();
const mailgun = require("mailgun-js");
const {check, validationResult} = require("express-validator");
const Recaptcha = require("express-recaptcha").RecaptchaV2;

//array holding check functions for validation of fields
const validation = [
    check("name", "A valid name is required.").not().isEmpty().trim().escape(),
    check("email", "Please provide a valid email").isEmail(),
    check("subject").optional().trim().escape(),
    check("message", "A message shorter than 2000 characters is required").trim().escape().isLength({min:1, max:2000})
];

//set up express
const app = express();
//set up recaptcha object
const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY);
//set up mailgun object
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

const handlePostRequest = (request, response) => {
    response.append("Content-Type", "text/html")
    console.log(request.body);
    if(request.recaptcha.error) {
        return response.send(`<div class="alert alert-danger" role='alert'><strong>There was an error with recaptcha!</strong></div>`)
    }

    const errors = validationResult(request)

    if(errors.isEmpty() === false) {
        const currentError = errors.array()[0]
        return response.send(`<div class="alert alert-danger" role="alert"><strong>${currentError.msg}</strong></div>`)
    }

    //object destructuring to pull out content from request body object
    const {email, name, subject, message} = request.body;
    const mailgunData = {
        to: process.env.MAIL_RECIPIENT,
        from: `${name} <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        subject: `${email}: ${subject}`,
        text: message
    }

    mg.messages().send(mailgunData, (error) => {
        if(error) {
            return response.send(Buffer.from(`<div class='alert alert-danger' role='alert'>Unable to send email!</div>`))
        }
    });
    return response.send(Buffer.from("<div class='alert alert-success' role='alert'>Email successfully sent.</div>"))
}

indexRoute.route("/")
    .get(handleGetRequest)
    .post(validation, recaptcha.middleware.verify, handlePostRequest);

app.use("/apis", indexRoute);

app.listen(4200, () => console.log("Express successfully built."));