import slugify from 'slugify'
import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"
import { SubCategory } from "../../../DB/models/subCategory.schema.js"


const AddsubCategory=catchError(  async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
const subcategory=new SubCategory(req.body)
await subcategory.save()
res.status(201).json({message:"Created..",subcategory})
})

const getSubCategories =catchError( async(req,res)=>{
    let filterObj={}
    if(req.params.category) filterObj.category = req.params.category
    const subCategories =await SubCategory.find(filterObj)
    res.status(200).json({message:"All Categories:..",subCategories})
})

const getsubCategory =catchError(async(req,res,next)=>{
    const subcategory =await SubCategory.findById(req.params.id)
    subcategory || next(new AppError('subCategory Not Found',404))
    !subcategory || res.status(200).json({message:" subCategory:..",subcategory})
})


const updatesubCategory =catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const subcategory =await SubCategory.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    subcategory || next(new AppError('subCategory Not Found',404))
    !subcategory || res.status(200).json({message:" Updated:..",subcategory})
})


const deletesubCategory =catchError(async(req,res,next)=>{
    const subcategory =await SubCategory.findByIdAndDelete(req.params.id,{new:true})
    subcategory || next(new AppError('subCategory Not Found',404))
    !subcategory || res.status(200).json({message:" Deleted:..",subcategory})
})          

export{
    AddsubCategory,
    getSubCategories,
    getsubCategory,
    updatesubCategory,
    deletesubCategory
}