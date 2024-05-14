import express from "express";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { userController } from "../controllers/userController";

//-----------------------------------------------------

const router = express.Router();

//Admin and stylist routes.

router.get("/allUsers", auth, authorize(["Admin", "Stylist"]), userController.getAllUsers);
router.get("/allStylist", auth, authorize(["Admin"]), userController.getAllStylist);
router.get("/user/:id", auth, authorize(["Admin"]), userController.getUserById);
router.get("/appointment/:id", auth, authorize(["Admin", "Stylist"]), userController.getAppointmentById);






//Client routes.
router.get("/profile", auth, userController.getMeProfile);
router.get("/appointment", auth, userController.getMeAppointment);
router.put("/putProfile", auth, userController.updateProfile);


export default router