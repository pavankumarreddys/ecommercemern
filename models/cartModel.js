import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userid:{
    type:String,
    required:true
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default:1
  },
  stock: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('usercartItems', cartSchema);