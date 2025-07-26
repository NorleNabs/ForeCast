import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  adress: String,
});

const User = mongoose.model("Users", userSchema);

export default User;
