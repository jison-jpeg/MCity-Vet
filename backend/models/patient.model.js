import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  headCount: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  services: {
    type: [String],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
