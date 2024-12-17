import { Router } from "express";
import { CreatCashOrder, CreatCheckoutSession, getAllOrders, getUserOrders } from "./order.controller.js";
import { allowTo, protectedRouter } from "../auth/auth.controller.js";
const OrderRouter= Router({mergeParams:true})

OrderRouter.route('/:id').post(protectedRouter,allowTo('user'),CreatCashOrder)
OrderRouter.get('/',protectedRouter,allowTo('user','admin'),getUserOrders)
OrderRouter.get('/',protectedRouter,allowTo('admin'),getAllOrders)
OrderRouter.post('/checkout/:id',protectedRouter,allowTo('user'),CreatCheckoutSession)

export default OrderRouter