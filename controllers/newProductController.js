import newProductModel from "../models/newProductModel.js";

// creating new product
export const newProductController = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      brand,
      price,
      discountPercentage,
      rating,
      stock,
      category,
      thumbnail,
      images,
    } = req.body;
    if(!id){
      return res.send({message:'Id is Required'})
    }
    if(!title){
      return res.send({message:'Title is Required'})
    }
    if(!description){
      return res.send({message:'Description is Required'})
    }
    if(!brand){
      return res.send({message:'Brand is Required'})
    }
    if(!price){
      return res.send({message:'Price is Required'})
    }
    if(!discountPercentage){
      return res.send({message:'DiscountPercentage is Required'})
    }
    if(!rating){
      return res.send({message:'Rating is Required'})
    }
    if(!stock){
      return res.send({message:'Stock is Required'})
    }
    if(!category){
      return res.send({message:'Category is Required'})
    }
    if(!thumbnail){
      return res.send({message:'Thumbnail is Required'})
    }
    if(!images){
      return res.send({message:'Similar Images is Required'})
    }

    const newProduct = await newProductModel.create({
      id,
      title,
      description,
      brand,
      price,
      discountPercentage,
      rating,
      stock,
      category,
      thumbnail,
      images,
    });

    res.status(201).send({
      success: true,
      message: "New Product Added Successfully",
      newProduct,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in New Product Adding",
      error,
    });
  }
};

//getting new all products
export const getAllNewProducts = async (req,res)=>{
  try{
    const allProductsData = await newProductModel.find({})
    if(allProductsData.length>0){
      res.status(200).send({
        success:200,
        message:"New Products arrived successfully",
        products:allProductsData
    })
    }else{
      res.status(200).send({
        success:200,
        message:"No Items Found",
        products:allProductsData
    })
  }

  }catch(error){
    res.status(500).send({
      success:false,
      message:"Error in Getting All New Products",
      error,
    })
  }
}