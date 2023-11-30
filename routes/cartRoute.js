import express  from "express";
import {testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {myCartController,getCart,updateUserCartData,deleteUserCartData,deleteUserTable} from '../controllers/cartController.js'
//router object
const router = express.Router()

//routing


//getcart data || get method
router.get('/items',requireSignIn,getCart) // verifying this with jwt token

//myCart data || Post Method
router.post('/mycart',requireSignIn,myCartController)

//my cart data update || PUT method
router.put('/updatemycart',requireSignIn,updateUserCartData)

//myCart single Item delete || DELETE method
router.delete('/deletemyitem',requireSignIn,deleteUserCartData)

//myCart Deleteuse total cart delete || DELETE method
router.delete('/deleteallitems',requireSignIn,deleteUserTable)




//test Route 
//router.get('/test',requireSignIn,isAdmin ,testController)

export default router