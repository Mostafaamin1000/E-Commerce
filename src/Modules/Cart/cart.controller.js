import { Cart } from "../../../DB/models/cart.schema.js"
import { Coupon } from "../../../DB/models/coupon.schema.js";
import { Product } from "../../../DB/models/product.schema.js"
import { catchError } from "../../MiddleWares/CatchError.js"
import { AppError } from "../../utils/appError.js"


// function calcTotalPrice(cart){
//     isCartExist.totalCartprice =isCartExist.cartItems.reduce((prev,item)=>prev+=item.quantity*item.price , 0)

// }


const AddToCart = catchError(async (req, res, next) => {
    let isCartExist = await Cart.findOne({user:req.user._id})
    let product = await Product.findById(req.body.product)
if(!product) return next(new AppError('Product Not Found',404))
    req.body.price = product.price
    if(req.body.quantity > product.Stock) return next(new AppError('Sold Out',404))
    if(!isCartExist){
        let cart = new Cart({
            user:req.user._id,
            cartItems:[req.body]
        })
        await cart.save()
    }else{
let item = isCartExist.cartItems.find(item=> item.product == req.body.product)
if(item){
    item.quantity+=req.body.quantity || 1
if(item.quantity > product.Stock) return next(new AppError('Sold Out',404))
} 
isCartExist.totalCartprice=isCartExist.cartItems.reduce((prev,item)=>prev+=item.quantity*item.price,0)
if(isCartExist.discount){
    isCartExist.totalCartpriceAfterdiscount=isCartExist.totalCartprice - (isCartExist.totalCartprice * isCartExist.discount)/100

}
if(!item) isCartExist.cartItems.push(req.body)


await isCartExist.save()
res.json({message:'Success',cart:isCartExist})
    }
});

        


const  updateQuantity =catchError(async(req,res)=>{    
let cart = await Cart.findOne({user:req.user._id})
if(!cart) return next(new AppError('Cart Not Found',404))   
let item = cart.cartItems.find(item=>item.product == req.params.id)
item.quantity = req.body.quantity
cart.totalCartprice = cart.cartItems.reduce((prev,item)=>prev+=item.quantity*item.price , 0)
if(cart.discount){
    cart.totalCartpriceAfterdiscount=cart.totalCartprice - (cart.totalCartprice * cart.discount)/100

}
await cart.save()
res.status(200).json({message:"Success:..",cart})   

})


const removeItemFromCart= catchError(async(req,res,next)=>{
let cart = await Cart.findOneAndUpdate({user:req.user._id}, 
    {$pull:{cartItems:{_id:req.params.id}}}, {new:true})
    cart.totalCartprice = cart.cartItems.reduce((prev,item)=>prev+=item.quantity*item.price , 0)
    if(cart.discount){
        cart.totalCartpriceAfterdiscount=cart.totalCartprice - (cart.totalCartprice * cart.discount)/100

    }
await cart.save()
cart || next(new AppError('Cart not found',404))
!cart || res.status(200).json({message:"Success:..",cart})  
})

const getUserCart =catchError(async(req,res,next)=>{
let cart = await Cart.findOne({user:req.user._id})
cart || next(new AppError('Cart not found',404))
!cart || res.status(200).json({message:"Success:..",cart})
})


const clearUserCart =catchError(async(req,res,next)=>{
    let cart = await Cart.findOneAndDelete({user:req.user._id})
    cart || next(new AppError('Cart not found',404))
    !cart || res.status(200).json({message:"Success:..",cart})
    })
    

const ApplyCoupon = catchError(async(req,res,next)=>{
    console.log(req.user._id);
let coupon = await Coupon.findOne({code:req.body.code,expires:{$gte:Date.now()}})
if(!coupon) return next(new AppError('Invalid coupon',404)) 
    let cart = await Cart.findOne({user:req.user._id})
cart.totalCartpriceAfterdiscount=cart.totalCartprice - (cart.totalCartprice * coupon.Discount)/100
cart.discount = coupon.Discount
await cart.save()
res.status(200).json({message:"Success:..",cart})
})


export{
    AddToCart,
    updateQuantity,
    removeItemFromCart,
    getUserCart,
    clearUserCart,
    ApplyCoupon
}