import slugify from 'slugify'
import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"
import { User } from '../../../DB/models/user.schema.js'


const AddUsers=catchError(  async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
const Users=new User(req.body)
await Users.save()
res.status(201).json({message:"Created..",Users})
})

const getUsers =catchError( async(req,res)=>{
    let filterObj={}
    if(req.params.category) filterObj.category = req.params.category
    const subCategories =await User.find(filterObj)
    res.status(200).json({message:"All Categories:..",subCategories})
})

const getUser =catchError(async(req,res,next)=>{
    const user =await User.findById(req.params.id)
    user || next(new AppError('User Not Found',404))
    !user || res.status(200).json({message:" User:..",user})
})


const updateUsers =catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const Users =await User.findByIdAndUpdate(req.params.id ,req.body,{new:true})
    Users || next(new AppError('Users Not Found',404))
    !Users || res.status(200).json({message:" Updated:..",Users})
})


const deleteUsers =catchError(async(req,res,next)=>{
    const Users =await User.findByIdAndDelete(req.params.id,{new:true})
    Users || next(new AppError('Users Not Found',404))
    !Users || res.status(200).json({message:" Deleted:..",Users})
})          

export{
    AddUsers,
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
}