import { Router } from "express";
import { AddBrand, deleteBrand, getBrand, getBrands, updateBrand } from "./brand.controller.js";
import { uploadSinleFile } from "../../fileUpload/fileUpload.js";
import { Validate } from "../../MiddleWares/validate.js";
import { AddBrandVal } from "./brand.validation.js";
const BrandRouter= Router()



BrandRouter.route('/')
.post(uploadSinleFile('logo','brand'),Validate(AddBrandVal),AddBrand).get(getBrands)


BrandRouter.route('/:id').get(getBrand).put(uploadSinleFile('logo','brand'),updateBrand).delete(deleteBrand)


export default BrandRouter