import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"
import { User } from '../../../DB/models/user.schema.js'



const getuserWishlist =catchError(async(req,res,next)=>{
    const wishlist =await User.findById(req.user._id).populate('Wishlist')
    wishlist || next(new AppError('wishlist Not Found',404))
    !wishlist || res.status(200).json({message:" All Wishlists:..",wishlist:wishlist.Wishlist})
})



const AddWishlist =catchError(async(req,res,next)=>{
    const wishlist =await User.findByIdAndUpdate(req.user._id ,{$addToSet:{Wishlist:req.body.product}},{new:true})
    wishlist || next(new AppError('wishlist Not Found',404))
    !wishlist || res.status(200).json({message:" Updated:..",wishlist:wishlist.Wishlist})
})
        

const removeFromWishlist =catchError(async(req,res,next)=>{
    const wishlist =await User.findByIdAndUpdate(req.user._id ,{$pull:{Wishlist:req.params.id}},{new:true})
    wishlist || next(new AppError('wishlist Not Found',404))
    !wishlist || res.status(200).json({message:" Removed:..",wishlist:wishlist.Wishlist})
})
        


export{
    AddWishlist,
    removeFromWishlist,
    getuserWishlist
}