const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middlewares/error.middleware");
const authenticate = require("./middlewares/auth.middleware");
const vehicleRoutes = require("./routes/vehicle.routes");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
app.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

app.use(errorHandler);

module.exports = app;