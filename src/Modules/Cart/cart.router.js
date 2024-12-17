import { Router } from "express";
import { allowTo, protectedRouter } from "../auth/auth.controller.js";
import { AddToCart, ApplyCoupon, clearUserCart, getUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js";
const CartRouter= Router()



CartRouter.route('/').post(protectedRouter,allowTo('user'),AddToCart)
.get(protectedRouter,allowTo('user'),getUserCart).delete(protectedRouter,allowTo('user'),clearUserCart)
CartRouter.route('/:id').put(protectedRouter,allowTo('user'),updateQuantity)
.delete(protectedRouter,allowTo('user'),removeItemFromCart)

CartRouter.post('/apply-coupon',protectedRouter,allowTo('user'),ApplyCoupon)



export default CartRouter