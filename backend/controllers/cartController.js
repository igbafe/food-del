import userModel from "../models/userModel.js"

// add items to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.status(200).json({ success: true, message: "Item added to cart", cartData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while adding item to cart" })
    }
}

// remove items from cart 
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
            // Remove item if quantity becomes 0
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId]
                // Force update the cart data in database
                await userModel.findByIdAndUpdate(req.body.userId, { $set: { cartData } })
            } else {
                await userModel.findByIdAndUpdate(req.body.userId, { cartData })
            }
        }
        res.status(200).json({ success: true, message: "Item removed to cart", cartData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while removing item to cart" })
    }
}

// fetch cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.status(200).json({ success: true, message: "Cart data fetched", cartData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error while fetching cart data" })
    }
}

export { addToCart, removeFromCart, getCart }