const express = require('express');
const User = require('../users/user.model');
const Order = require('../orders/orders.model');
const Reviews = require('../reviews/reviews.model');

const router = express.Router();

//get user stats by email
router.get('/user-stats/:email', async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    //sum of all orders
    const totalPaymentsResult = await Order.aggregate([
      { $match: { email: email } },
      {
        $group: { _id: null, totalAmount: { $sum: '$amount' } },
      },
    ]);

    const totalPaymentsAmount =
      totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;

    //get total reviews
    const totalReviews = await Reviews.countDocument({
      userId: user._d,
    });

    //total purchased products
    const purchasedProductsIds = await Order.distinct('products.productId', {
      email: email,
    });
    const totalPurchasedProducts = purchasedProductsIds.length;

    res.status(200).send({
      totalPayments: totalPaymentsAmount.toFixed(2),
      totalReviews,
      totalPurchasedProducts,
    });
  } catch (error) {
    console.log('Error fetching user stats', error);
    res.status(500).send({ message: 'Failed to fetch user stats' });
  }
});

module.exports = router;
