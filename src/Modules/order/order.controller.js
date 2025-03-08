import { Cart } from "../../../DB/models/cart.schema.js";
import { Order } from "../../../DB/models/order.schema.js";
import { Product } from "../../../DB/models/product.schema.js";
import { catchError } from "../../MiddleWares/CatchError.js";
import { AppError } from "../../utils/appError.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CreatCashOrder = catchError(async (req, res, next) => {
  //1-get user cart
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart Not Found", 404));
  //2- calc total price
  let OrderTotalPrice = cart.totalCartpriceAfterdiscount || cart.totalCartprice;
  //3- create order
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    totalOrderprice: OrderTotalPrice,
    ShippingAddress: req.body.ShippingAddress,
  });
  await order.save();
  //4-increment sold snd decrement stock
  let option = cart.cartItems.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.product },
        update: { $inc: { sold: prod.quantity, Stock: -prod.quantity } },
      },
    };
  });
  await Product.bulkWrite(option);
  //5-clear user cart after  order .
  await Cart.findByIdAndDelete(cart._id);
  res.json({ message: "success", order });
});

const getUserOrders = catchError(async (req, res, next) => {
  let orders = await Order.findOne({ user: req.user._id }).populate(
    "orderItems.product"
  );
  res.json({ message: "success", orders });
});

const getAllOrders = catchError(async (req, res, next) => {
  let orders = await Order.find();
  res.json({ message: "success", orders });
});

const CreatCheckoutSession = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart Not Found", 404));
  let OrderTotalPrice = cart.totalCartpriceAfterdiscount || cart.totalCartprice;

  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: OrderTotalPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://chatgpt.com/", //? لو نجح العمليه اوديك علي فين
    cancel_url: "https://chatgpt.com/", //! لو فشلت العمليه اوديك علي صفحه اي برضو ,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.ShippingAddress,
  });

  res.json({ message: "Success Payment", session });
});

export { CreatCashOrder, getUserOrders, getAllOrders, CreatCheckoutSession };
