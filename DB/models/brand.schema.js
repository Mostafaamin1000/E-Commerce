import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({
name:{
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
logo:String,
CreatedBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
}
},{
    timestamps:false,
    versionKey:false
})

schema.post('init',function (doc){
    if(doc.logo) doc.logo = "http://localhost:3000/uploads/brand/" + doc.logo
    })

export const Brand= model('Brand',schema)