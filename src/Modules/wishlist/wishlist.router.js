import { Router } from "express";
import { AddWishlist, getuserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { allowTo, protectedRouter } from "../auth/auth.controller.js";
const WishlistRouter= Router()



WishlistRouter.route('/').patch(protectedRouter,allowTo('user'),AddWishlist)
.get(protectedRouter,allowTo('user'),getuserWishlist)

WishlistRouter.route('/:id').delete(protectedRouter,allowTo('user','admin'),removeFromWishlist)



export default WishlistRouter