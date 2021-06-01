const { Category } = require('../models/');

const getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ categories });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'error get all categories' });
  }
};

const create = async (req, res, next) => {
  try {
    const { name, img } = req.body;
    const category = await Category.create({ name, img });
    return res.status(200).json({ category });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: `Category add error ` });
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { categoryId } = req.body;
    await Category.destroy({ where: { id: categoryId } });
    return res.status(200).json({ message: `Category deleted ` });
  } catch (error) {
    res.status(400).json({ message: `Category deleted error ` });
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { categoryId, name } = req.body;

    const category = await Category.findOne({ where: { id: categoryId } });

    category.name = name;
    category.save();

    return res.status(200).json({ message: `Category update ` });
  } catch (error) {
    res.status(400).json({ message: `Category update error ` });
  }
};

module.exports = { getAll, create, deleteOne, updateOne };
