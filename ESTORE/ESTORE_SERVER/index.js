const express = require('express');
const productCategories = require('./routes/productCategories');
const products = require('./routes/product');
const users = require('./routes/users');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const orders = require('./routes/orders');
const PORT = 5001;


app.use(cors());
app.use('/productCategories',productCategories);
app.use(bodyparser.json())
app.use('/products',products);
app.use('/users',users);
app.use('/orders',orders)
const server = app.listen(PORT,()=>{
    console.log('listening on port 5001')
});