const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');
const Basket = require('./Basket');
const Basket_product = require('./Basket_product');
const Order = require('./Order');
const Order_product = require('./Order_product');

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasOne(Basket, { onDelete: 'CASCADE' });
Basket.belongsTo(User);

Basket.hasMany(Basket_product, { onDelete: 'CASCADE' });
Basket_product.belongsTo(Basket);

Product.hasOne(Basket_product, { onDelete: 'CASCADE' });
Basket_product.belongsTo(Product);

Basket.hasMany(Order, { onDelete: 'CASCADE' });
Order.belongsTo(Basket);

Order.hasMany(Order_product, { onDelete: 'CASCADE' });
Order_product.belongsTo(Order);

Product.hasMany(Order_product, { onDelete: 'CASCADE' });
Order_product.belongsTo(Product);

module.exports = { Product, Category, User, Basket, Basket_product, Order, Order_product };
