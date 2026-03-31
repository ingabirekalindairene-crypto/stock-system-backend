const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./authRoutes");
const requestRoutes = require("./requestRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));