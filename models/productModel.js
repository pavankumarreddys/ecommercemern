import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);