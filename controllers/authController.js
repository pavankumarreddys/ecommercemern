import userModel from "../models/userModel.js";
import cartModel from "../models/cartModel.js";

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken'

//REGISTER
export const registerController = async(req,res) => {
    try{
        const {name,email,password,phone} = req.body
        //validations 
        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        

        //check user
        const existingUser = await userModel.findOne({email})

        //check existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message: "Already Register Please Login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({name,email,phone,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:"User Register Successfully",
            user
        })


    }catch(error){
        console.log(first)
        res.status(500).send({
            success:false,
            message:'Error in register',
            error
        })
    }
};

//LOGIN
export const loginController = async (req,res)=>{
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:"Invalid email or password",  
            })
        }

        //check user 
        const user = await userModel.findOne({email})
        if(!user){
            console.log("userrrr",user)
            return res.status(200).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }

        //token
        const token  = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });

        const userid = user._id
         const cartData = await cartModel.find({userid});

        res.status(200).send({
            success:200,
            message:"Login Successfully",
            user,
            cartData,
            token 
        })

    }catch(error){
        console.log("error",error)
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}

// FORGOT PASSWORD
export const forgotPassword = async (req,res)=>{
    try{
        const {email,password} = req.body 

        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:"Invalid email or password",  
            })
        }

        //check user
        const findUser = await userModel.findOne({email})

        if(findUser){
            // converting password to hashed password
            const hashedPassword = await hashPassword(password)

            // Update the userPassword
            const updatedUserPassword = await userModel.findOneAndUpdate(
                {email},
                { $set: { password: hashedPassword } },
                { new: true } // Return the updated document
            );

            res.status(200).send({
                success:200,
                message:"Password Updated Successfully",
            
            })
        }else{
            res.status(400).send({
                success:false,
                message:"Email is not registered",  
            })
        }


    }catch(error){
        console.log("error",error)
        res.status(500).send({
            success:false,
            message:"Error in changing Password",
            error
        })
    }
}


//JWT test
export const testController = async (req,res)=>{
    console.log("protected route")
    res.send("Protected route")
}