import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"
import { User } from '../../../DB/models/user.schema.js'



const getuserAddress =catchError(async(req,res,next)=>{
    const address =await User.findById(req.user._id).populate('Address')
    address || next(new AppError('address Not Found',404))
    !address || res.status(200).json({message:" All adresss:..",address:address.Address})
})

const AddAddress =catchError(async(req,res,next)=>{
    const address =await User.findByIdAndUpdate(req.user._id ,{$push:{Address:req.body}},{new:true})
    address || next(new AppError('address Not Found',404))
    !address || res.status(200).json({message:" Updated:..",address:address.Address})
})
        
const removeAddress =catchError(async(req,res,next)=>{
    const address =await User.findByIdAndUpdate(req.user._id ,{$pull: { Address:{ _id:req.params.id} } } ,{new:true})
    address || next(new AppError('address Not Found',404))
    !address || res.status(200).json({message:" Removed:..",address:address.Address})
})
        

export{
    AddAddress,
    removeAddress,
    getuserAddress
}