import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

//protected route token base 
export const requireSignIn = async(req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Invalid Authorization Header"
            });
        }

        const token = authHeader.substring(7); // Remove "Bearer " from the header

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch (error){
        console.log("jwt",error)
        res.status(401).send({
            success:false,
            error,
            message: "Verify Authorization Token"
        })
    }
}

//admin access
export const isAdmin = async (req,res,next) =>{
    try{
        const user =await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            })
        }else{
            next();
        }
    }catch(error){
        console.log("admin",error)
        res.status(401).send({
            success:false,
            error,
            message: "Error in admin middleware"
        })
    }
}