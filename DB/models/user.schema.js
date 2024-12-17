import mongoose, {Schema,model} from "mongoose";

const schema=new Schema({
name:{
    type:String,
    required:[true,'Name is required'],
},
email:{
    type:String,
    unique:true,
    required:true
},
password:{
    type:String,
    required:true,
    minLength:7
},
role:{
    type:String,
    enum:['admin','user'],
    defult:"user"
},
isBlocked:{
    type:Boolean,
    default:false
},
Wishlist:[{
    type:mongoose.Types.ObjectId,
    ref:"Product"
}],
Address:[{
    city:String,
    phone:String,
    street:String
}]
},{
    timestamps:false,
    versionKey:false
})

export const User= model('User',schema)