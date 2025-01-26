const express = require('express');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');

const router = express.Router();

//create product route
router.post('/create-product', async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });

    const savedProduct = await newProduct.save();

    //calculate rating
    const reviews = await Reviews.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      await savedProduct.save();
    }
    res.status(200).send(savedProduct);
  } catch (error) {
    console.error('Error creating product', error);
    res.status(500).send({ message: 'Error creating product' });
  }
});

router.get('/', async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (color && color !== 'all') {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(maxPrice)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('author', 'email')
      .sort({ createAt: -1 });

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).send({ message: 'Error fetching products' });
  }
});

module.exports = router;
