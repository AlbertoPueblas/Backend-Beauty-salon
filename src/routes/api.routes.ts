import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes"
import appointmentRoutes from "./appointment.routes"
import treatmentRoutes from "./treatment.routes";

//---------------------------------------------------

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/treatment", treatmentRoutes)


export default router;