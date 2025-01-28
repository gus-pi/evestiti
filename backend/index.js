const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares setup
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

//routes
const authRoutes = require('./src/users/user.route');
const productsRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.route');
const orderRoutes = require('./src/orders/orders.route');

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);

main()
  .then(() => console.log('mongodb successfully connected'))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);

  app.get('/', (req, res) => {
    res.send('Evestiti Server is Running!');
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
