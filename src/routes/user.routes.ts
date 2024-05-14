import express from "express";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { userController } from "../controllers/userController";

//-----------------------------------------------------

const router = express.Router();

//Admin and stylist routes.

router.get("/allUsers", auth, authorize(["Admin", "Stylist"]), userController.getAllUsers);
router.get("/allStylist", auth, authorize(["Admin"]), userController.getAllStylist);


export default router