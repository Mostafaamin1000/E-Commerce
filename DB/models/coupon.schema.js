import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({
code:{
type:String,
unique:true,
required:true
},
expires:{
type:Date
},
Discount:{
    type:Number,
    min:0
}
},{
    timestamps:false,
    versionKey:false
})

export const Coupon= model('Coupon',schema)