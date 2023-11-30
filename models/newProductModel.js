import mongoose from "mongoose";

const addNewProduct = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    },
  title:{
    type:String,
    required:true
  },
  description:{
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
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images:{
    type:[String],
    required:true
  }
}, { timestamps: true });

export default mongoose.model('addnewproducts', addNewProduct);