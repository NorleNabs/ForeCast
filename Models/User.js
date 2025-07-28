import mongoose from "mongoose";

const setUserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  province: String,
  city: String,
  defaultnews: String,
});

const SetUsers = mongoose.model("Users", setUserSchema);
export default SetUsers;
