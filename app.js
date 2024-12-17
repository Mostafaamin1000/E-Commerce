process.on('uncaughtException',(err)=>{console.log('Error in Code',err);})
import express from 'express'
import { DBConnect } from './DB/db.connection.js'
import {bootstrap} from './src/Bootstrap.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/MiddleWares/globalError.js'
import multer from 'multer';
import {v4 as uuidv4} from 'uuid'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port= 3000 
app.use(express.json())
bootstrap(app)
app.use('/uploads',express.static('uploads'))


const storage = multer.diskStorage({
    destination:(_req, _file, cb)=> {
    cb(null, 'uploads')
    },
    filename:(_req, file, cb)=> {
    cb(null, uuidv4 + '-' + file.originalname)
    }
})
const upload = multer({ storage })

app.post('/api/photo', upload.single('image') ,(req,res,next )=>{
    console.log(req.file);
    console.log(req.body);
    res.json({message:"success"})
})




app.use('*', (req,res,next)=>{
        next(new AppError(`Route Not Found ${req.originalUrl}`,404))
})

app.use(globalError)
process.on('unhandledRejection',(err)=>{
console.log("Error",err);

})

app.listen(port,()=>{
    console.log('Server is running..');
    
})
