import express from "express"
import bodyParser from "body-parser";
import nodemailer from 'nodemailer'
import cors from 'cors'
import { PORT } from "./config.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://khaleejmandi.co.uk', 'https://khaleejmandi.co.uk', 'https://khaleej.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type'],
    optionsSuccessStatus: 204,
  })
)

app.get('/test', (req, res) => {
  return res.status(201).send("Test working")
})

app.post('/majlis-form', (req, res) => {
  try {
    const formData = req.body;
    // Send email to admin
    sendEmailToAdmin(formData, "New Majlis Booking");

    // Send confirmation email to user
    sendConfirmationEmail(formData);
    res.status(201).send(formData);
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
});

app.post('/contact-form', (req, res) => {
  try {
    const formData = req.body;
    // Send email to admin
    sendEmailToAdmin(formData, "New Enquiry");

    res.status(201).send(formData);
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
})

function sendEmailToAdmin(formData, subject) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    // port: 465,
    secure: false,
    auth: {
      user: 'leicester@khaleejmandi.co.uk',
      pass: 'HWpvqLKuVEid',
    },
  });

  const mailOptions = {
    from: 'leicester@khaleejmandi.co.uk',
    to: 'leicester@khaleejmandi.co.uk',
    subject: subject,
    html: `<p>Name: ${formData.name}</p>
    <p>Email: ${formData.email}</p>
    <p>Phone: ${formData.phoneNumber}</p>
    ${formData.date ? `
      <div>
        <p>Date: ${formData.date}</p>
        <p>Time: ${formData.time}</p>
        <p>No. of Persons: ${formData.numberOfPersons}</p>
      </div>` : ''}
    <p>Message: ${formData.message}</p>
    ...`, // Add other form fields
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendConfirmationEmail(formData) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    secure: false,
    auth: {
      user: 'leicester@khaleejmandi.co.uk',
      pass: 'HWpvqLKuVEid',
    },
  });

  const mailOptions = {
    from: 'leicester@khaleejmandi.co.uk',
    to: formData.email,
    subject: 'Majlis Booking Received',
    html: `<p>Name: ${formData.name}</p>
    <p>Email: ${formData.email}</p>
    <p>Phone: ${formData.phoneNumber}</p>
    <p>Date: ${formData.date}</p>
    <p>Time: ${formData.time}</p>
    <p>No. of Persons: ${formData.numberOfPersons}</p>
    <p>Message: ${formData.message}</p>
    ...`, // Add other form fields
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});