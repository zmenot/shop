const router = require('express').Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const productRouter = require('./product');
const basketRouter = require('./basket');
const orderRouter = require('./order');

// router

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/basket', basketRouter);
router.use('/order', orderRouter);

module.exports = router;
