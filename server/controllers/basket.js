const { Basket } = require('../models/');
const { Basket_product } = require('../models/');

// const { User } = require('../models/');

const getBasketByUserId = async (req, res, next) => {
  try {
    const { id } = req.body;
    const basket = await Basket.findOne({ where: { userId: id } });
    const products = await Basket_product.findAll({ where: { basketId: basket.id } });
    return res.status(200).json({ basketId: basket.id, products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'get basket error' });
  }
};

const deleteBasketByUserId = async (req, res, next) => {
  try {
    const { id } = req.body;
    // await Basket.destroy({ where: { id } });
    return res.status(200).json();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'get basket error' });
  }
};

const deleteProductInBasket = async (req, res, next) => {
  try {
    const { basketId, productId } = req.body;
    await Basket_product.destroy({
      where: {
        basketId,
        productId,
      },
    });
    return res.status(200).json({ message: 'product deleted!' });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'delete product in  basket error' });
  }
};

const addProductInBasket = async (req, res, next) => {
  try {
    const { basketId, productId } = req.body;
    const productInBasket = await Basket_product.create({ basketId, productId });
    return res.status(200).json({ productInBasket });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'add product  basket error' });
  }
};

const updateCountProduct = async (req, res, next) => {
  try {
    const { basketId, productId, count_product } = req.body;
    // await Basket.destroy({ where: { id } });
    const productInBasket = await Basket_product.findOne({
      where: {
        basketId,
        productId,
      },
    });

    productInBasket.count_product = count_product;
    await productInBasket.save();

    return res.status(200).json({ message: 'product count update' });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'product count update error' });
  }
};

module.exports = { getBasketByUserId, deleteProductInBasket, addProductInBasket, updateCountProduct };
