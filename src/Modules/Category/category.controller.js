import { Category } from "../../../DB/models/Category.schema.js"
import slugify from 'slugify'
import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"


const AddCategory=catchError(  async(req,res)=>{
    req.body.slug=slugify(req.body.name)
    req.body.image=req.file.filename
const category=new Category(req.body)
await category.save()
res.status(201).json({message:"Created..",category})
})

const getCategories =catchError( async(req,res)=>{
    const Categories =await Category.find()
    res.status(200).json({message:"All Categories:..",Categories})
})

const getCategory =catchError(async(req,res,next)=>{
    const category =await Category.findById(req.params.id)
    category || next(new AppError('Category Not Found',404))
    !category || res.status(200).json({message:" Category:..",category})
})


const updateCategory =catchError(async(req,res,next)=>{
    if(req.body.slug) req.body.slug=slugify(req.body.name)
    if(req.file) req.body.image=req.file.filename
    const category =await Category.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    category || next(new AppError('Category Not Found',404))
    !category || res.status(200).json({message:" Updated:..",category})
})


const deleteCategory =catchError(async(req,res,next)=>{
    const category =await Category.findByIdAndDelete(req.params.id,{new:true})
    category || next(new AppError('Category Not Found',404))
    !category || res.status(200).json({message:" Deleted:..",category})
})          

export{
    AddCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}