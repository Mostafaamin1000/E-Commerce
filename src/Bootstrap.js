import AddressRouter from "./Modules/address/address.router.js"
import authRouter from "./Modules/auth/auth.router.js"
import OrderRouter from "./Modules/Brand copy/order.router.js"
import BrandRouter from "./Modules/Brand/brand.router.js"
import CartRouter from "./Modules/Cart/cart.router.js"
import categoryRouter from "./Modules/Category/category.router.js"
import couponRouter from "./Modules/coupon/coupon.router.js"
import ProductRouter from "./Modules/Product/product.router.js"
import ReviewRouter from "./Modules/review/review.router.js"
import subCategoryRouter from "./Modules/SubCategory/subcategory.router.js"
import UserRouter from "./Modules/user/user.router.js"
import WishlistRouter from "./Modules/wishlist/wishlist.router.js"

export const bootstrap=(app)=>{
    app.use('/api/category', categoryRouter)
    app.use('/api/subcategory', subCategoryRouter)
    app.use('/api/Brand', BrandRouter)
    app.use('/api/Product', ProductRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/review', ReviewRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/wishlist', WishlistRouter)
    app.use('/api/address', AddressRouter)
    app.use('/api/coupon', couponRouter)
    app.use('/api/cart', CartRouter)
    app.use('/api/order', OrderRouter)
}