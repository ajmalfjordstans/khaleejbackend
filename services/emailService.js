import nodemailer from 'nodemailer'
import axios from 'axios';

const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'sendgrid';

async function sendWithProvider({ from, to, subject, html }) {
  if (EMAIL_PROVIDER === 'sendgrid') {
    try {
      console.log('Sending email with SendGrid:', from, "-", to);
      if (!process.env.SENDGRID_API_KEY) throw new Error('Missing SENDGRID_API_KEY');
      const replyTo = process.env.REPLY_TO_ADDRESS; // optional
      await axios.post(
        'https://api.sendgrid.com/v3/mail/send',
        {
          personalizations: [{ to: [{ email: to }] }],
          from: { email: 'leicester@khaleejmandi.co.uk' },
          reply_to: replyTo ? { email: replyTo } : undefined,
          subject,
          content: [{ type: 'text/html', value: html }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return { provider: 'sendgrid' };
    } catch (error) {
      console.error('SendGrid failed, attempting fallback:', error.response?.data || error.message);
      // Fall through to other providers
    }
  }

  if (EMAIL_PROVIDER === 'resend') {
    console.log('Sending email with Resend:');
    if (!process.env.RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY');
    await axios.post(
      'https://api.resend.com/emails',
      { from, to, subject, html },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return { provider: 'resend' };
  }

  // Fallback to Zoho nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: 'leicester@khaleejmandi.co.uk',
      pass: 'HWpvqLKuVEid',
    },
  });

  return new Promise((resolve, reject) => {
    transporter.sendMail({ from, to, subject, html }, (error, info) => {
      console.log('Sending email with Zoho:');
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve({ provider: 'zoho' });
      }
    });
  });
}

export function sendEmailToAdmin(formData, id, subject) {
  const from = process.env.EMAIL_FROM_ADDRESS || 'leicester@khaleejmandi.co.uk';
  const to = 'khaleejfoodsuk@gmail.com';

  let html;
  if (id === 'enquiry') {
    html = `
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333; margin-bottom: 20px;">New Enquiry Received</h1>
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
        </div>`;
  } else {
    html = `
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
        </div>`;
  }

  return sendWithProvider({ from, to, subject, html });
}

export function sendConfirmationEmail(formData, id) {
  const from = process.env.EMAIL_FROM_ADDRESS || 'leicester@khaleejmandi.co.uk';
  const to = formData.email;
  const subject = `Majlis Booking Received`;
  const html = `
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
      <div/>`;

  return sendWithProvider({ from, to, subject, html });
}

export function sendUpdateEmail(formData, update, id) {
  const from = process.env.EMAIL_FROM_ADDRESS || 'leicester@khaleejmandi.co.uk';
  const to = formData.email;
  const subject = `Majlis booking ${update}`;
  const html = `
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
      <div/>`;

  return sendWithProvider({ from, to, subject, html });
}
