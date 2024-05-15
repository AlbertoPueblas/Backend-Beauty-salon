import express from "express"
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";
import { treatsmentController } from "../controllers/treatsmentController";

//----------------------------------------


const router = express.Router();

router.post("/newTreatsment",auth, authorize(["Admin"]), treatsmentController.create);
router.get("/allTreatsment",auth, authorize(["Admin"]), treatsmentController.getAllTreatsment);
router.get("/Treatsment/:id",auth, authorize(["Admin"]), treatsmentController.getTreatsmentById);
router.put("/putTreatsment",auth, authorize(["Admin"]), treatsmentController.updateTreatsment);
router.delete("/dellTreatsment/:id",auth, authorize(["Admin"]), treatsmentController.deleteTreatsment);




export default router;