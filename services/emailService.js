import nodemailer from 'nodemailer'

export function sendEmailToAdmin(formData, subject) {
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
    to: 'frontend.fjordstans@gmail.com',
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

export function sendConfirmationEmail(formData) {
  const transporter = nodemailer.createTransport({
    // service: 'gmail',
    // auth: {
    //   user: 'frontend.fjordstans@gmail.com',
    //   pass: 'nfhw gklr kyyh fvtv',
    // },
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