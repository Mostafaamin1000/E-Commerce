import { Router } from "express";
import { allowTo, protectedRouter } from "../auth/auth.controller.js";
import { AddAddress, getuserAddress, removeAddress } from "./address.controller.js";
const AddressRouter= Router()



AddressRouter.route('/').patch(protectedRouter,allowTo('user'),AddAddress)
.get(protectedRouter,allowTo('user'),getuserAddress)

AddressRouter.route('/:id').delete(protectedRouter,allowTo('user','admin'),removeAddress)



export default AddressRouter