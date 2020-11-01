const MongoClient = require('mongodb').MongoClient;

const url = MONGODB_URI;

const createProduct = async (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db();
    const result = db.collection('products').insertOne(product);
    console.log(result);
  } catch (e) {
    return res.json({message: 'could not store data'});
  }
  await client.close();
  await res.json(product);
};

const getProduct = async (req, res, next) => {
  const client = new MongoClient(url);
  let result = null;
  try {
    await client.connect();
    const db = client.db();
    result = await db.collection('products').find().toArray();
  } catch (e) {
    return res.json({message: 'Connection failed'});
  }
  await client.close();
  await res.json(result);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;
