import { Router } from "express";
import { AddCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from "./coupon.controller.js";
import { allowTo, protectedRouter } from "../auth/auth.controller.js";
const couponRouter= Router()

couponRouter.use(protectedRouter,allowTo("admin"))

couponRouter.route('/')
.post(AddCoupon).get(getCoupons)


couponRouter.route('/:id').get(getCoupon).put(updateCoupon).delete(deleteCoupon)


export default couponRouter