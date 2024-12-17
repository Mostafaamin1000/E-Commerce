import { Router } from "express";
import { AddReview, deleteReview, getoneReview, getReviews, updateReview } from "./review.controller.js";
import { allowTo, protectedRouter } from "../auth/auth.controller.js";

const ReviewRouter= Router()



ReviewRouter.route('/')
.post(protectedRouter,allowTo('user'),AddReview).get(getReviews)


ReviewRouter.route('/:id').get(getoneReview)
.put(protectedRouter,allowTo('user'),updateReview)
.delete(protectedRouter,allowTo('user','admin'),deleteReview)


export default ReviewRouter