import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;