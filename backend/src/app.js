import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import serviceRoutes from "./routes/service.routes.js";
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to DentalBook API ",
  });
});


app.use("/api/auth",authRoutes)
app.use("/api/services",serviceRoutes)

export default app;