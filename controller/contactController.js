import db from '../firebase.js';
import { sendEmailToAdmin } from '../services/emailService.js';

export const contactController = async (req, res) => {
  try {
    const id = req.body.email;
    const contactDetails = {
      email: req.body.email,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
      status: 'new'
    }
    const response = db.collection('enquiries').doc(id).set(contactDetails)
    console.log(response);
    const formData = req.body;
    // Send email to admin
    sendEmailToAdmin(formData, "New Enquiry");
    res.status(201).send(formData);
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

export const getContactsController = async (req, res) => {
  try {
    const usersRef = db.collection("enquiries")
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

export const updateContactsController = async (req, res) => {
  try {
    // console.log(req)
    const userRef = db.collection("enquiries").doc(req.params.id)
      .update({
        status: req.body.status
      })
    res.send(userRef)
  } catch (error) {
    res.send(error)
  }
}

export const deleteContactsController = async (req, res) => {
  try {
    const response = await db.collection("enquiries").doc(req.params.id).delete()
    res.send(response)
  } catch (error) {
    res.send(error)
  }
}