import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import connectDb from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cartRoutes from './routes/cartRoute.js'
import productRoutes from './routes/productRoutes.js'
import newProducuRoute from './routes/newProductRoute.js'

// Get the current file's directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure environment variables
dotenv.config();

// Database configuration
connectDb();

// Create the express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cart', cartRoutes); //my mart data
app.use('/api/v1/userCart', cartRoutes)
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/newproduct", newProducuRoute); //admin adding new product



// Serve the React app's HTML file
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Define the PORT
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_mode} mode, port ${PORT}`);
});
