import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({

user:{type:mongoose.Types.ObjectId, ref:'User'},
cartItems:[
    {
        product:{type:mongoose.Types.ObjectId, ref:'Product'},
        quantity:{type:Number , default:1},
        price:Number
    }
],
totalCartprice:Number,
discount:Number,
totalCartpriceAfterdiscount:Number

},{
    timestamps:false,
    versionKey:false
})


export const Cart= model('Cart',schema)