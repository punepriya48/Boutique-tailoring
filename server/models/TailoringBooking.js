import mongoose from "mongoose";

const tailoringBookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    service: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    measurements: {
      bust: String,
      waist: String,
      hip: String,
      blouseLength: String,
      shoulder: String,
    },
    fabricType: { type: String },
    designNotes: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.TailoringBooking ||
  mongoose.model("TailoringBooking", tailoringBookingSchema);
