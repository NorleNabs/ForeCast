import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./Models/User.js";
import Location from "./Models/SetLocation.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // ✅ this needs User to be imported
    res.json(users);
    console.log(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/locations", async (req, res) => {
  try {
    const { province, city } = req.body;
    const setLocation = new Location({ province, city });
    const savedLocation = await setLocation.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/locations", async (req, res) => {
  try {
    const location = await Location.find(); // ✅ this needs User to be imported
    res.json(location);
    console.log(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database Connected Success.");
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
