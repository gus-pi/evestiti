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

module.exports = router;
