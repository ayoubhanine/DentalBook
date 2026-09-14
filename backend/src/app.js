import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import serviceRoutes from "./routes/service.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

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
app.use("/api/schedules",scheduleRoutes)
app.use("/api/appointments", appointmentRoutes);

export default app;