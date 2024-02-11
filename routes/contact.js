import express from "express";
import { contactController, deleteContactsController, getContactsController, updateContactsController } from "../controller/contactController.js";

const router = express.Router();

router.post("/", contactController);
router.get("/getEnquiries", getContactsController);
router.post("/updateEnquiries/:id", updateContactsController);
router.delete("/deleteEnquiries/:id", deleteContactsController);

export default router;