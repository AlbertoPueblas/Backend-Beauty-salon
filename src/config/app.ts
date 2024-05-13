import express, { Application } from "express";
import cors from "cors";
import { corsOptions } from "./cors";
// import apiRoutes from "./routes/api.routes";
// import baseRoutes from "./routes/base.routes";

// -----------------------------------------------------------------------------



const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));

//Register API routes
// app.use("/api", apiRoutes);

// //Register base route
// app.use("/", baseRoutes)

export default app;
