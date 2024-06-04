import express from "express";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { userController } from "../controllers/userController";

//-----------------------------------------------------

const router = express.Router();

//Admin and stylist routes.
router.post("/newStylist", auth, authorize(["Admin"]), userController.createStylist);
router.get("/allUsers", auth, authorize(["Admin"]), userController.getAllUsers);
router.get("/allStylist", auth, authorize(["Admin"]), userController.getAllStylist);
router.get("/user/:id", auth, authorize(["Admin"]), userController.getUserById);
router.get("/appointments/:id", auth, authorize(["Admin",]), userController.getAppointmentById);
router.put("/restore/:id", auth, authorize(["Admin"]), userController.restoreProfileByAdmin);
router.put("/disable/:id", auth, authorize(["Admin"]), userController.desactiveProfileByAdmin);
router.delete("/permanentDell/:id",auth,authorize(["Admin"]), userController.deleteProfileByAdmin)





//Client routes.
router.get("/profile", auth, userController.getMeProfile);
router.get("/appointment", auth, userController.getMeAppointment);
router.put("/putProfile", auth, userController.updateProfile);
router.put("/delete", auth, userController.deleteProfileByUser);
router.put("/active", auth, userController.activeProfileByUser);


export default router