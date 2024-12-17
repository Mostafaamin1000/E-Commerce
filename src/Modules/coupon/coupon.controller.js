import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"
import { Coupon } from "../../../DB/models/coupon.schema.js"


const AddCoupon=catchError(  async(req,res,next)=>{
    let isExist = await Coupon.findOne({code:req.body.code})
    if(isExist) return next(new AppError('Coupon is Exist',409))
const coupon=new Coupon(req.body)
await coupon.save()
res.status(201).json({message:"Created..",coupon})
})

const getCoupons =catchError( async(req,res)=>{
    const coupon =await Coupon.find()
    res.status(200).json({message:"All Categories:..",coupon})
})

const getCoupon =catchError(async(req,res,next)=>{
    const coupon =await Coupon.findById(req.params.id)
    coupon || next(new AppError('Coupon Not Found',404))
    !coupon || res.status(200).json({message:" Coupon:..",coupon})
})


const updateCoupon =catchError(async(req,res,next)=>{
    const coupon =await Coupon.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    coupon || next(new AppError('coupon Not Found',404))
    !coupon || res.status(200).json({message:" Updated:..",coupon})
})


const deleteCoupon =catchError(async(req,res,next)=>{
    const coupon =await Coupon.findByIdAndDelete(req.params.id,{new:true})
    coupon || next(new AppError('coupon Not Found',404))
    !coupon || res.status(200).json({message:" Deleted:..",coupon})
})          

export{
    AddCoupon,
    getCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}