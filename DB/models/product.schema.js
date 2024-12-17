import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({
title:{
    type:String,
    required:[true,'Name is required'],
    trim:true,
    minLength:[2,'Tooo Short']
},
slug:{
    type:String,
    lowercase:true,
    required:true
},
description:{
    type:String,
    required:[true,'description is required'],
    minLength:[10,'Tooo Short']
},
price:{
    type:Number,
    min:0
},
priceAfterDiscount:{
    type:Number,
    min:0
},
sold:Number,
Stock:Number,
rateAvg:{
    type:Number,
    min:0,
    max:5
},
rateCount:Number,
category:{
    type:mongoose.Types.ObjectId,
    ref:"Category"
},
subCategory:{
    type:mongoose.Types.ObjectId,
    ref:"SubCategory"
},
brand:{
    type:mongoose.Types.ObjectId,
    ref:"Brand"
},
CreatedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
},
imageCover:String,
images:[String]
},{
    timestamps:false,
    versionKey:false,
    toJSON:{virtuals:true}
})
            
schema.virtual('MyReviews', {
    ref:"Review",
    localField:"_id",
    foreignField:"product"
})

    schema.pre(/^find/,function (){
        this.populate('MyReviews')
        })

schema.post('init',function (doc){
    if(doc.imageCover) doc.imageCover = process.env.BASE_URL + doc.imageCover
    if(doc.images) doc.images =doc.images.map(img=> process.env.BASE_URL + img)

    })

export const Product= model('Product',schema)