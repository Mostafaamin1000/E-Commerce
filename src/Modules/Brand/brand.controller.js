import slugify from 'slugify'
import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"
import { Brand } from '../../../DB/models/brand.schema.js'


const AddBrand=catchError(  async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
const brand=new Brand(req.body)
await brand.save()
res.status(201).json({message:"Created..",brand})
})

const getBrands =catchError( async(req,res)=>{
    const Brands =await Brand.find()
    res.status(200).json({message:"All Brands:..",Brands})
})

const getBrand =catchError(async(req,res,next)=>{
    const brand =await Brand.findById(req.params.id)
    brand || next(new AppError('brand Not Found',404))
    !brand || res.status(200).json({message:" brand:..",brand})
})


const updateBrand =catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug=slugify(req.body.name)
    if(req.file)  req.body.logo=req.file.filename
    const brand =await Brand.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    brand || next(new AppError('brand Not Found',404))
    !brand || res.status(200).json({message:" Updated:..",brand})
})


const deleteBrand =catchError(async(req,res,next)=>{
    const brand =await Brand.findByIdAndDelete(req.params.id,{new:true})
    brand || next(new AppError('brand Not Found',404))
    !brand || res.status(200).json({message:" Deleted:..",brand})
})          

export{
    AddBrand,
    getBrands,
    getBrand,
    updateBrand,
    deleteBrand
}