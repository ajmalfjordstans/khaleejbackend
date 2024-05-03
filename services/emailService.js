import nodemailer from 'nodemailer'

export function sendEmailToAdmin(formData, id, subject) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
      user: 'leicester@khaleejmandi.co.uk',
      pass: 'HWpvqLKuVEid',
    },
  });

  const mailOptionsBooking = {
    from: 'leicester@khaleejmandi.co.uk',
    to: 'leicester@khaleejmandi.co.uk',
    subject: subject,
    html: `
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333333; margin-bottom: 20px;">New Majlis Booking Received</h1>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="color: #666666; margin: 5px 0;"><strong>Booking number:</strong> ${id}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Phone:</strong> ${formData.phoneNumber}</p>
            ${formData.date ? `
            <div>
              <p style="color: #666666; margin: 5px 0;"><strong>Date:</strong> ${formData.date}</p>
              <p style="color: #666666; margin: 5px 0;"><strong>Time:</strong> ${formData.time}</p>
            </div>`
        :
        ''}
            <p style="color: #666666; margin: 5px 0;"><strong>No. of Persons:</strong> ${formData.numberOfPersons}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Message:</strong> ${formData.message}</p>
        </div>
    </div>`, // Add other form fields
  };
  const mailOptionsEnquiry = {
    from: 'leicester@khaleejmandi.co.uk',
    to: 'leicester@khaleejmandi.co.uk',
    subject: subject,
    html: `
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333333; margin-bottom: 20px;">New Majlis Booking Received</h1>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="color: #666666; margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Phone:</strong> ${formData.phoneNumber}</p>
            ${formData.date ? `
            <div>
              <p style="color: #666666; margin: 5px 0;"><strong>Date:</strong> ${formData.date}</p>
              <p style="color: #666666; margin: 5px 0;"><strong>Time:</strong> ${formData.time}</p>
            </div>`
        :
        ''}
            <p style="color: #666666; margin: 5px 0;"><strong>Message:</strong> ${formData.message}</p>
        </div>
    </div>`, // Add other form fields
  };

  transporter.sendMail(id === 'enquiry' ? mailOptionsEnquiry : mailOptionsBooking, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export function sendConfirmationEmail(formData, id) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
      user: 'leicester@khaleejmandi.co.uk',
      pass: 'HWpvqLKuVEid',
    },
  });

  const mailOptions = {
    from: 'leicester@khaleejmandi.co.uk',
    to: formData.email,
    subject: `Majlis Booking Received`,
    html: `
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);" >
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.khaleejmandi.co.uk/Logo.png" alt="Restaurant Logo" style="width: auto; max-height: 150px;  margin-left: auto; margin-right: auto;">
        </div>
        <h1 style="color: #333333; margin-bottom: 20px;">Majlis Booking Received</h1>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="color: #666666; margin: 5px 0;"><strong>Booking number:</strong> ${id}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Phone:</strong> ${formData.phoneNumber}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Date:</strong> ${formData.date}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Time:</strong> ${formData.time}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>No. of Persons:</strong> ${formData.numberOfPersons}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Message:</strong> ${formData.message}</p>
        </div>
        <p style="color: #666666; margin-bottom: 20px;">Thank you for choosing our restaurant for your reservation. We look forward to serving you!</p>
        // <img src="https://www.khaleejmandi.co.uk/hmc%20black.png" alt="Image" style="max-width: 100px; height: auto;">
      <div/>`, // Add other form fields
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export function sendUpdateEmail(formData, update, id) {
  console.log(formData);
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
      user: 'leicester@khaleejmandi.co.uk',
      pass: 'HWpvqLKuVEid',
    },
  });

  const mailOptions = {
    from: 'leicester@khaleejmandi.co.uk',
    to: formData.email,
    subject: `Majlis booking ${update}`,
    html: `
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);" >
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://www.khaleejmandi.co.uk/Logo.png" alt="Restaurant Logo" style="width: auto; max-height: 150px;  margin-left: auto; margin-right: auto;">
        </div>
        <h1 style="color: #333333; margin-bottom: 20px;">Majlis booking ${update}</h1>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="color: #666666; margin: 5px 0;"><strong>Booking number:</strong> ${id}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Name:</strong> ${formData.name}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Email:</strong> ${formData.email}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Phone:</strong> ${formData.phoneNumber}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Date:</strong> ${formData.date}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Time:</strong> ${formData.time}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>No. of Persons:</strong> ${formData.numberOfPersons}</p>
            <p style="color: #666666; margin: 5px 0;"><strong>Message:</strong> ${formData.message}</p>
        </div>
        <p style="color: #666666; margin-bottom: 20px;">Thank you for choosing our restaurant for your reservation. We look forward to serving you!</p>
        // <img src="https://www.khaleejmandi.co.uk/hmc%20black.png" alt="Image" style="max-width: 100px; height: auto;">
      <div/>`, // Add other form fields
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}