import slugify from 'slugify'
import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"
import { Review } from '../../../DB/models/review.schema.js'


const AddReview=catchError(  async(req,res,next)=>{
    req.body.user= req.user._id
    let isExist = await Review.findOne({user:req.user._id,product:req.body.product})
    if (isExist) return next(new AppError('You already reviewd this product',401))
const review=new Review(req.body)
await review.save()
res.status(201).json({message:"Created..",review})
})

const getReviews =catchError( async(req,res)=>{
    const reviews =await Review.find()
    res.status(200).json({message:"All reviews:..",reviews})
})

const getoneReview =catchError(async(req,res,next)=>{
    const review =await Review.findById(req.params.id)
    review || next(new AppError('review Not Found',404))
    !review || res.status(200).json({message:" review:..",review})
})


const updateReview =catchError(async(req,res,next)=>{
    const review =await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id} ,req.body,{new:true})
    review || next(new AppError('review Not Found ,or you are not the one who create the review',404))
    !review || res.status(200).json({message:" Updated:..",review})
})


const deleteReview =catchError(async(req,res,next)=>{
    const review =await Review.findByIdAndDelete(req.params.id,{new:true})
    review || next(new AppError('review Not Found',404))
    !review || res.status(200).json({message:" Deleted:..",review})
})          

export{
    AddReview,
    getReviews,
    getoneReview,
    updateReview,
    deleteReview
}