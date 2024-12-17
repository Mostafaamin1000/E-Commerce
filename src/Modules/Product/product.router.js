import { Router } from "express";
import { AddProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./product.controller.js";
import { uploadMixOFFiles } from "../../fileUpload/fileUpload.js";

const ProductRouter= Router()



ProductRouter.route('/')
.post(uploadMixOFFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:6}],'product'),AddProduct).get(getProducts)


ProductRouter.route('/:id').get(getProduct).put(uploadMixOFFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:6}],'product'),updateProduct).delete(deleteProduct)


export default ProductRouter