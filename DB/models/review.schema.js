import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({
    comment:String,
user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
},
product:{
    type:mongoose.Types.ObjectId,
    ref:"Product"
},
rate:{
    type:Number,
    min:0,
    max:5
}
},{
    timestamps:false,
    versionKey:false
})

schema.pre(/^find/,function (){
this.populate('user','name')
})


export const Review= model('Review',schema)