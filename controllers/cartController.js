import cartModel from "../models/cartModel.js";
import JWT from 'jsonwebtoken'


// creating cartData for user
export const myCartController = async (req,res) =>{
    try{
    const {userid,brand,price,discount,rating,id,quantity,stock,title,thumbnail,} = req.body
    const cart = await new cartModel({userid,brand,price,discount,rating,id,quantity,stock,title,thumbnail}).save()
    res.status(201).send({
        success:true,
        message:"Product Added Successfully",
        cart
    })

    }catch(error){
        console.log("error",error)
        res.status(500).send({
            success:false,
            message:"Error in MyCart Products",
            error
        })
    }
}

//get cartData
export const getCart = async (req,res)=>{
  try{
      const {userid} = req.query
      const cartData = await cartModel.find({userid});

      if(cartData.length>0){
        res.status(200).send({
          success:200,
          message:"Your cart is loaded and ready to roll! 🛒",
          data:cartData
      })
      }else{
        res.status(200).send({
          success:200,
          message:"Your cart is empty 🛒",
          data:cartData
      })
    }
      

  }catch(error){
      res.status(500).send({
          success:false,
          message:"Unable to find your Data",
          error
      })
  }
}

//put method update cartData

export const updateUserCartData = async (req, res) => {
  try {
    const { userid, id, quantity } = req.body;

    // Find the cart item with the given 'userid' and 'id'
    const userCart = await cartModel.findOne({ userid, id });

    // If the cart item exists, update the quantity
    if (userCart) {
      // Update the quantity in the database
      const updatedCart = await cartModel.findOneAndUpdate(
        { userid, id },
        { $set: { quantity: quantity } },
        { new: true } // Return the updated document
      );

      // Fetch the updated cart data for the user
      const cartData = await cartModel.find({ userid });

      // Send the updated data as a response
      return res.status(200).send({
        success: true,
        message: "Item Qty updated Successfully",
        cartData,
      });
    } else {
      // If the cart item with the given 'userid' and 'id' doesn't exist, you may handle this case as needed
      return res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



//delete method cartData
export const deleteUserCartData = async (req, res) => {
  try {
    const {userid ,id } = req.body;

    // Find the cart item with the given 'id'
    const userCart = await cartModel.findOne({userid, id });

    if (userCart) {
      // If the cart item exists, perform the deletion
      await cartModel.deleteOne({ id });
      
      // Fetch the remaining cart data
      const cartData = await cartModel.find({userid});
      //===================if u need whole tabele======================================
    //await cartModel.find({}); like this empty need to call

      if (cartData.length > 0) {
        // Send the updated data as a response
        return res.status(200).send({
          success: true,
          message: "Cart item deleted successfully",
          cartData,
        });
      } else {
        // If the cart data is empty after deletion, communicate it to the client
        return res.status(404).send({
          success: false,
          message: "Cart is empty after deletion",
        });
      }


    } else {
      // If the cart item with the given 'id' doesn't exist, you may handle this case as needed
      return res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete method allItems
export const deleteUserTable = async (req,res) =>{
  try {
    // Use deleteMany to delete all items in the collection
    const {userid} = req.body
    await cartModel.deleteMany({userid});
    return res.status(200).send({
      success: true,
      message: "Cart cleared successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}




//JWT test
export const testController = async (req,res)=>{
    console.log("protected route")
    res.send("Protected route")
}

