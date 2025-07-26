import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  province: String,
  city: String,
});

const Location = mongoose.model("Location", locationSchema);
export default Location;
