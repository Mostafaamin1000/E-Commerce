import { Router } from "express";
import { AddUsers, deleteUsers, getUser, getUsers, updateUsers } from "./user.controller.js";
import OrderRouter from "../Brand copy/order.router.js";
const UserRouter= Router()

UserRouter.use('/:userId/orders',OrderRouter)

UserRouter.route('/')
.post(AddUsers).get(getUsers)


UserRouter.route('/:id').get(getUser).put(updateUsers).delete(deleteUsers)


export default UserRouter