import express  from "express";
import {registerController,loginController,forgotPassword,testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router()

//routing

//REGISTER ||METHOD POST
router.post('/register',registerController)
//registerController is on js file

//Login || POST METHOD
router.post('/login',loginController)

//forgotpassword || PUT METHOD
router.put('/forgotpassword',forgotPassword)


//test Route 
router.get('/test',requireSignIn,isAdmin ,testController)

export default router