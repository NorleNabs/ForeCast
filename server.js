import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import SetUsers from "./Models/User.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

//Users Fetch
app.get("/api/users", async (req, res) => {
  try {
    const users = await SetUsers.find(); // ✅ this needs User to be imported
    res.json(users);
    console.log(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sign up
app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, email, province, city, defaultnews } = req.body;
    const setLocation = new SetUsers({
      username,
      password,
      email,
      province,
      city,
      defaultnews,
    });
    const savedLocation = await setLocation.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Log in
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await SetUsers.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        city: user.city,
        defaultnews: user.defaultnews,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
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
