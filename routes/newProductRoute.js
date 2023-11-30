import express from "express";
import { newProductController,getAllNewProducts } from "../controllers/newProductController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();



//adding new product 
router.post("/addnewproduct", requireSignIn, newProductController);

//getting all newProducts
router.get("/getallnewproducts",getAllNewProducts)

export default router;