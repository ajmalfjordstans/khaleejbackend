import express from "express";
import { cancelMajlisReservation, createMajlisBooking, deleteMajlisReservation, findMajlisReservation, getMajlisReservations, updateMajlisReservation } from "../controller/majlisController.js";

const router = express.Router();

router.post("/", createMajlisBooking);
router.get("/getReservations", getMajlisReservations);
router.get("/findReservation/:id", findMajlisReservation);
router.post("/cancelReservation/:id", cancelMajlisReservation);
router.post("/updateReservation/:id", updateMajlisReservation);
router.delete("/delete/:id", deleteMajlisReservation);

export default router;