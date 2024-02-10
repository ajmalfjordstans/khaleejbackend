import express from "express";
import { contactController, getContactsController } from "../controller/contactController.js";

const router = express.Router();

router.post("/", contactController);
router.get("/getEnquiries", getContactsController);

export default router;