import userModel from "../models/userModel.js"

// add items to cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId })
        let cartData = await userData.cartData
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1 
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.status(200).json({success:true, message:"Item added to cart", cartData})
    } catch (error) {
       console.log(error)
         res.status(500).json({success:false, message:"Error while adding item to cart"})   
    }
}

// remove items from cart 
const removeFromCart = async (req,res) => {
    
}

// fetch cart data
const getCart = async (req,res) => {
    
}

export {addToCart, removeFromCart, getCart}