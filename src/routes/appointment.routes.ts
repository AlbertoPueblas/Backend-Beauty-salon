import express from "express";
import { auth } from "../middlewares/auth";
import { appointmentController } from "../controllers/appointmentController";
import { authorize } from "../middlewares/authorize";

//--------------------------------------

const router = express.Router();

//Client routes.
router.post("/create",auth, appointmentController.create);
router.put("/modAppointment", auth, appointmentController.updateAppointment);
router.delete("/deleteAppointment/:id", auth, appointmentController.deleteAppointment);

//Admin routes

router.get("/totalDates",auth, authorize(["Admin"]),appointmentController.getAllAppointment);
router.get("/date/:id",auth, authorize(["Admin"]),appointmentController.getAppointmentById);

export default router;