import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    status:{
      type: Boolean,
      default: true
    }
  },
  { timestamps: true },
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
