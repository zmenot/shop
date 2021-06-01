const { Product } = require('../models');
const uuid = require('uuid');
const path = require('path');

const getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'get all products error' });
  }
};

const create = async (req, res, next) => {
  try {
    const { name, price, price_stock, categoryId } = req.body;
    let fileName = '';
    if (req.files) {
      const { img } = req.files;
      fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static(img)', 'product', fileName)); // перемещаем файл в папку
    }
    const product = await Product.create({
      name,
      price,
      price_stock,
      img: fileName,
      categoryId: categoryId === 'null' ? null : categoryId,
    });
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'create  products error' });
  }
};

const update = async (req, res, next) => {
  try {
    const { id, name, price, price_stock, categoryId } = req.body;
    console.log(req.body);
    const product = await Product.findOne({ where: { id } });
    let fileName = product.img;
    if (req.files) {
      const { img } = req.files;
      fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static(img)', 'product', fileName)); // перемещаем файл в папку
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.price_stock = price_stock || product.price_stock;
    if (categoryId !== 'null') {
      product.categoryId = categoryId;
    }
    if (categoryId === 'null') {
      product.categoryId = null;
    }
    product.img = fileName;
    await product.save();
    return res.status(200).json({ product });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'update product error' });
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.body;
    await Product.destroy({ where: { id } });
    return res.status(200).json({ message: 'deleted  product ' });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'delete product error' });
  }
};

module.exports = { getAll, create, update, deleteOne };
