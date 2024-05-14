import express, {Request, Response} from "express";

//--------------------------------------------------

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Welcome to REST API for Beauty Salon 🖋 ")
});

export default router;