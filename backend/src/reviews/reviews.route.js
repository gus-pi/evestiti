const express = require('express');
const Reviews = require('./reviews.model');
const Products = require('../products/products.model');

const router = express.Router();

//post a new review
router.post('/post-review', async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;

    if (!comment || !rating || !productId || !userId) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const existingReview = await Reviews.findOne({ productId, userId });
    if (existingReview) {
      //update review
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
    } else {
      const newReview = new Reviews({
        comment,
        rating,
        productId,
        userId,
      });
      await newReview.save();
    }

    //calculate average rating
    const reviews = await Reviews.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      const product = await Products.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).send({ message: 'Product not found' });
      }
    }

    res
      .status(200)
      .send({ message: 'Review posted succesfully', reviews: reviews });
  } catch (error) {
    console.log('Error posting review', error);
    res.status(500).send({ message: 'Failed to post review' });
  }
});

module.exports = router;
