const { Order } = require('../models');
const { Order_product } = require('../models');
const { Basket_product } = require('../models');
const { Product } = require('../models');

const create = async (req, res, next) => {
  try {
    const { name, address, phone, date, comments, payment, basketId } = req.body;
    const order = await Order.create({ name, address, phone, date, comments, payment, basketId });
    const basket_product = await Basket_product.findAll({ where: { basketId } });

    for (const product in basket_product) {
      // console.log(product);
      await Order_product.create({
        orderId: order.id,
        productId: basket_product[product].productId,
        count_product: basket_product[product].count_product,
      });
    }
    return res.status(200).json({ message: ' order created' });
  } catch (e) {
    res.status(404).json({ message: 'create order error' });
  }
};

const update = async (req, res, next) => {
  try {
    const { isConfirmed, orderId } = req.body;
    const order = await Order.findOne({ where: { id: orderId } });
    order.isConfirmed = isConfirmed;
    await order.save();
    return res.status(200).json({ message: 'order updated' });
  } catch (e) {
    res.status(404).json({ message: 'update order error' });
  }
};

const getAll = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    for (const indexOrder in orders) {
      const products = await Order_product.findAll({ where: { orderId: orders[indexOrder].id } });
      for (const indexProducts in products) {
        let product = await Product.findOne({ where: { id: products[indexProducts].productId } });
        products[indexProducts] = { ...products[indexProducts].dataValues, ...product.dataValues };
      }
      orders[indexOrder] = { ...orders[indexOrder].dataValues, products };
    }
    return res.status(200).json({ orders });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: 'get orders error' });
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    await Order.destroy({ where: { id: orderId } });
    return res.status(200).json({ message: 'order delete' });
  } catch (e) {
    res.status(404).json({ message: 'order delete error' });
  }
};

module.exports = { create, getAll, update, deleteOne };
