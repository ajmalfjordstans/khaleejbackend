import { sendEmailToAdmin, sendConfirmationEmail } from '../services/emailService.js';
import db from '../firebase.js';

export const createMajlisBooking = async (req, res) => {
  try {
    const formData = req.body;
    const id = req.body.email;
    const userJson = {
      email: req.body.email,
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      numberOfPersons: req.body.numberOfPersons,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
      status: "pending"
    }
    const response = db.collection('reservation').doc(id).set(userJson)
    console.log(response);
    // Send email to admin
    sendEmailToAdmin(formData, "New Majlis Booking");
    // Send confirmation email to user
    sendConfirmationEmail(formData);
    res.status(201).send(formData);
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
};

export const getMajlisReservations = async (req, res) => {
  try {
    const usersRef = db.collection("reservation")
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
    res.send(userRef)
  } catch (error) {
    res.send(error)
  }
}

export const updateMajlisReservation = async (req, res) => {
  try {
    // console.log(req)
    const userRef = db.collection("reservation").doc(req.params.id)
      .update({
        status: req.body.status
      })
    res.send(userRef)
  } catch (error) {
    res.send(error)
  }
}

export const deleteMajlisReservation = async (req, res) => {
  try {
    const response = await db.collection("reservation").doc(req.params.id).delete()
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}