import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({

user:{type:mongoose.Types.ObjectId, ref:'User'},
orderItems:[
    {
        product:{type:mongoose.Types.ObjectId, ref:'Product'},
        quantity:Number,
        price:Number
    }
],
totalOrderprice:Number,
ShippingAddress:{
    city:String,
    street:String,
    phone:String
},
PaymentType:{
    type:String,
    enum:['cash','card'],
    default:'cash'
},
isDeliverd:{
    type:Boolean,
    default:false
},
isPaid:{
    type:Boolean,
    default:false
},
paidAt:Date,
deliverdAt:Date
},{
    timestamps:false,
    versionKey:false
})


export const Order= model('Order',schema)