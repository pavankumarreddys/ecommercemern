import express  from "express";
import {registerController,loginController,testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing

//REGISTER ||METHOD POST
router.post('/register',registerController)
//registerController is on js file

//Logig || POST METHOD
router.post('/login',loginController)

//test Route 
router.get('/test',requireSignIn,isAdmin ,testController)

export default router