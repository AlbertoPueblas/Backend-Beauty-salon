import express from "express"
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { treatmentController } from "../controllers/treatmentController";

//----------------------------------------


const router = express.Router();

router.post("/newTreatment",auth, authorize(["Admin"]), treatmentController.create);
router.get("/allTreatment",auth, authorize(["Admin"]), treatmentController.getAllTreatment);
router.get("/Treatment/:id",auth, authorize(["Admin"]), treatmentController.getTreatmentById);
router.put("/putTreatment",auth, authorize(["Admin"]), treatmentController.updateTreatment);
router.delete("/dellTreatment/:id",auth, authorize(["Admin"]), treatmentController.deleteTreatment);




export default router;