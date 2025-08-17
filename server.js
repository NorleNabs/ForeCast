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

//add todo list
app.post("/api/users/:id/todo", async (req, res) => {
  const { date, Fromtime, Totime, task } = req.body;

  if (!date || !Fromtime || !Totime || !task) {
    return res
      .status(400)
      .json({ error: "Date, time, and task are required." });
  }

  try {
    const user = await SetUsers.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    const now = new Date();
    const currentMonth = now.toLocaleString("default", { month: "long" });

    // Add new todo
    user.todo.push({ date, Fromtime, Totime, task });

    await user.save();

    res.status(200).json({
      message: "Todo added successfully.",
      todo: user.todo,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error.", details: err.message });
  }
});

//fetch todo list
app.get("/api/users/:id/todo", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await SetUsers.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.todo || []);
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
