import { sendEmailToAdmin, sendConfirmationEmail, sendUpdateEmail } from '../services/emailService.js';
import db from '../firebase.js';
import admin from 'firebase-admin';

const generateBookingNumber = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let bookingNumber = '';
  for (let i = 0; i < 8; i++) {
    bookingNumber += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return bookingNumber;
};

export const createMajlisBooking = async (req, res) => {
  try {
    const formData = req.body;
    const id = generateBookingNumber();
    const userJson = {
      id: id,
      email: req.body.email,
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      numberOfPersons: req.body.numberOfPersons,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
      status: "pending",
      createddatetime: admin.firestore.FieldValue.serverTimestamp()
    }
    const writeResult = await db.collection('reservation').doc(id).set(userJson)
    console.log('WriteResult:', writeResult);

    // Verify by reading back
    const docSnap = await db.collection('reservation').doc(id).get();
    console.log('Reservation exists:', docSnap.exists, 'ID:', id);
    if (!docSnap.exists) {
      console.error('Reservation not found after write. Check project/credentials.');
    }

    // Send email to admin
    sendEmailToAdmin(formData, id, "New Majlis Booking");
    // Send confirmation email to user
    sendConfirmationEmail(formData, id);
    res.status(201).send(formData);
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
};

export const getMajlisReservations = async (req, res) => {
  try {
    const usersRef = db.collection("reservation").orderBy('createddatetime', 'desc')
    const response = await usersRef.get()
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data())
    })
    res.send(responseArr)
  } catch (error) {
    res.send(error)
  }
}

export const findMajlisReservation = async (req, res) => {
  try {
    const userRef = db.collection("reservation").doc(req.params.id)
    const response = await userRef.get()
    res.send(response.data())
  } catch (error) {
    res.send(error)
  }
}

export const cancelMajlisReservation = async (req, res) => {
  try {
    const userRef = db.collection("reservation").doc(req.params.id)
      .update({
        status: "cancelled"
      })
    const user = db.collection("reservation").doc(req.params.id)
    const response = await user.get()
    sendUpdateEmail(response.data(), "cancelled", req.params.id)
    res.send(userRef)
  } catch (error) {
    res.send(error)
  }
}

export const updateMajlisReservation = async (req, res) => {
  try {
    const userRef = db.collection("reservation").doc(req.params.id)
      .update({
        status: req.body.status
      })
    const user = db.collection("reservation").doc(req.params.id)
    const response = await user.get()
    if (req.body.status !== 'completed') {
      sendUpdateEmail(response.data(), req.body.status, req.params.id)
    }
    res.send(response.data())
  } catch (error) {
    res.send(error)
  }
}

export const deleteMajlisReservation = async (req, res) => {
  try {
    const response = await db.collection("reservation").doc(req.params.id).delete()
    // const user = db.collection("reservation").doc(req.params.id)
    // const response2 = await user.get()
    // sendUpdateEmail(response2.data(), "delete", req.params.id)
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}