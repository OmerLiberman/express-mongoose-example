const mongoose = require('mongoose');

const ProductModel = require('./models/product');

const uri = 'mongodb+srv://omer11:omer11@cluster0.xtuj5.mongodb.net/products?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to mongoose!');
}).catch(err => {
  console.log(err);
});

const createProduct = async (req, res, next) => {
  const createdProduct = new ProductModel({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();
  await res.json(result);
};

const getProduct = async (req, res, next) => {
  const products = await ProductModel.find().exec();
  await res.json(products);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;


